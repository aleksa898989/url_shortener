import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { redisClient } from "../redis";
import { encodeBase62 } from "../utils/base62";

const prisma = new PrismaClient();

export const createShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const urlRecord = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode: null,
      },
    });

    const shortCode = encodeBase62(urlRecord.id);

    await prisma.url.update({
      where: { id: urlRecord.id },
      data: { shortCode },
    });

    await redisClient.setEx(shortCode, 86400, url);

    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginal = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  try {
    const cached = await redisClient.get(shortCode);
    if (cached) {
      return res.redirect(cached);
    }

    const urlRecord = await prisma.url.findUnique({
      where: { shortCode },
      select: { originalUrl: true },
    });

    if (!urlRecord) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    await redisClient.setEx(shortCode, 86400, urlRecord.originalUrl);

    res.redirect(urlRecord.originalUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

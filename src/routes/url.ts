import { Router, RequestHandler } from "express";
import {
  createShortUrl,
  redirectToOriginal,
} from "../controllers/urlController";

const router = Router();

router.post("/shorten", createShortUrl as RequestHandler);
router.get("/:shortCode", redirectToOriginal as RequestHandler);

export default router;

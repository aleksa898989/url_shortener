import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.POSTGRES_USERNAME}:${
    process.env.POSTGRES_PASSWORD
  }@${process.env.POSTGRES_HOST || "localhost"}:${
    process.env.POSTGRES_PORT || "5432"
  }/${process.env.POSTGRES_DATABASE_NAME}`;

export const db = new Pool({
  connectionString: connectionString,
});

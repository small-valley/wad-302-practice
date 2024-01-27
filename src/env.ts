import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const COOKIE_SESSION_KEY =
    process.env.COOKIE_SESSION_KEY || "secret key";

export const BASE_URL = process.env.BASE_URL || "base url";

export const HOST = process.env.HOST || "localhost";

export const DB_PORT = parseInt(process.env.DB_PORT ?? "5432");

export const DATABASE = process.env.DATABASE || "";

export const USER = process.env.DB_USER || "";

export const PASSWORD = process.env.PASSWORD || "";

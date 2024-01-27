import { Router } from "express";
import redirectController from "../controllers/redirectController";

export const redirectRoutes = Router();

redirectRoutes.get("/", redirectController.index);

redirectRoutes.get("/:shortUrl", redirectController.redirect);

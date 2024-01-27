import { Router } from "express";
import urlsController from "../controllers/urlsController";
import { validateCurrentUser } from "./../middleware/validate-current-user";

export const urlsRoutes = Router();

//>> RENDER HOME PAGE
urlsRoutes.get("/urls", validateCurrentUser, urlsController.index);

//>> RENDER NEW URL PAGE
urlsRoutes.get("/urls/new", validateCurrentUser, urlsController.renderNewUrl);

//>> RENDER THE EDIT URL PAGE
urlsRoutes.get("/urls/:id", validateCurrentUser, urlsController.renderEditUrl);

//>> CREATE A NEW URL
urlsRoutes.post("/urls/new", validateCurrentUser, urlsController.create);

//>> EDIT AN URL
urlsRoutes.post("/urls/:id", validateCurrentUser, urlsController.edit);

//>> DELETE AN URL
urlsRoutes.post(
    "/urls/:id/delete",
    validateCurrentUser,
    urlsController.deleteUrl
);

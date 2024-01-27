import { validateCurrentUser } from './../middleware/validate-current-user';
import { Router } from "express";
import authController from "../controllers/authControllers";


export const authRouter = Router();

//>> RENDERING LOGIN PAGE
authRouter.get("/login",  authController.renderLogin);

//>> RENDERING REGISTER PAGE
authRouter.get("/register", authController.renderRegister);

//>> CREATING USERS
authRouter.post("/register", authController.create);

//>> LOGIN
authRouter.post("/login", authController.login);

//>> LOGOUT
authRouter.post("/logout", authController.logout);

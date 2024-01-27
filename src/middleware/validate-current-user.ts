import { NextFunction, Request, Response } from "express";
import { users } from "../models/user";

//>> COOKIE SESSION

export const validateCurrentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const session = req.session;
    const isValidUser = users.some(
        (user) => user.email === session?.currentUser?.email
    );
    if (isValidUser) {
        next();
    } else {
        res.redirect("/auth/login");
    }
};

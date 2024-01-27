import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        console.log(err);
        res.render("error/index", {
            message: err.message,
            email: "",
            page: "",
        });
    }
};

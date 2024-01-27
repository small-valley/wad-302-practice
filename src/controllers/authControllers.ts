import * as crypto from "crypto";
import { Request, Response } from "express";
import { comparePassword, hashedPassword } from "../helpers/users.helper";
import { users } from "../models/user";
import { User } from "./../models/types/user";

const renderLogin = (req: Request, res: Response) => {
    const { email } = req.session?.currentUser ?? "";
    res.render("auth", { page: "login", email: email, message: "" });
};

const renderRegister = (req: Request, res: Response) => {
    const { email } = req.session?.currentUser ?? "";
    res.render("auth", { page: "register", email: email, message: "" });
};

const create = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm } = req.body;

    const isExisting = users.some((user) => user.email === email);

    if (isExisting) {
        res.status(400);
        res.render("auth", {
            page: "register",
            email: "",
            message: "User already exist",
        });
        return;
    }

    const isPasswordValid = password === passwordConfirm;

    if (!isPasswordValid) {
        res.status(400);
        res.render("auth", {
            page: "register",
            email: "",
            message: "Password and Confirm Password doesn't match",
        });
        return;
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        email: email,
        password: await hashedPassword(password),
    };

    users.push(newUser);

    res.redirect("/app/urls");
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const checkUser = users.find((user) => user.email === email);

    const isPasswordValid = await comparePassword(
        password,
        checkUser?.password ?? ""
    );

    if (!checkUser || !isPasswordValid) {
        res.status(400);
        res.render("auth", {
            page: "login",
            email: "",
            message: "Incorrect User email or Password",
        });
        return;
    }

    req.session = {
        currentUser: {
            id: checkUser!.id,
            email: checkUser!.email,
        },
    };

    res.redirect("/app/urls");
};

const logout = (req: Request, res: Response) => {
    req.session = null;
    res.redirect("/auth/login");
};

export default { renderLogin, renderRegister, create, login, logout };

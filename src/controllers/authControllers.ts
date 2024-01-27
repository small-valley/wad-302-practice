import { Request, Response } from "express";
import { pool } from "../db/helpers/pool";
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

    const result = await pool.query<User>(
        `SELECT * from users WHERE email = $1;`,
        [email]
    );

    const isExisting = result.rows.length >= 1;

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

    const response = await pool.query<User>(
        `
          INSERT INTO users (email, password)
          VALUES
            ($1, $2)
          RETURNING *;
        `,
        [email, await hashedPassword(password)]
    );

    console.log(response.rows[0]);

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

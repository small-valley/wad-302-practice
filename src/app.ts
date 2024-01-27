import cookieSession from "cookie-session";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import path from "path";
import { COOKIE_SESSION_KEY } from "./env";
import { errorHandler } from "./middleware/error-handler";
import { authRouter } from "./routes/authRoutes";
import { redirectRoutes } from "./routes/redirectRoutes";
import { urlsRoutes } from "./routes/urlsRoutes";

export const app = express();
app.use(
    cookieSession({
        keys: [COOKIE_SESSION_KEY],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", path.join(__dirname, "views/layouts/layout"));
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/app", urlsRoutes);
app.use("/auth", authRouter);
app.use("/", redirectRoutes);

// not found
app.all("*", (req, res) => {
    res.status(404);
    throw new Error("Page Not Found");
});

// middleware after route handler(error handler)
app.use(errorHandler);

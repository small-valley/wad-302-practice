import { Request, Response } from "express";
import isUrl from "is-url";
import { BASE_URL } from "../env";
import { uniqueUrl } from "../libs/generateRandomStrings";
import { isTheOwner, isUrlExisting } from "../libs/validation";
import { urls } from "../models/url";
import { users } from "../models/user";

//>> RENDER HOME PAGE
const index = (req: Request, res: Response) => {
    const currentUser = req.session?.currentUser;
    const user = users.find((user) => user.email === currentUser.email);
    const userUrls = urls.filter((url) => url.user_id === user?.id);
    res.render("urls/index", {
        urls: userUrls,
        email: user?.email ?? "",
        page: "index",
        baseUrl: BASE_URL,
    });
};

//>> RENDER NEW URL PAGE
const renderNewUrl = (req: Request, res: Response) => {
    const currentUser = req.session?.currentUser;
    const user = users.find((user) => user.email === currentUser.email);
    res.render("urls/newUrl", { email: user?.email, page: "new", message: "" });
};

//>> CREATE A NEW URL
const create = async (req: Request, res: Response) => {
    const currentUser = req.session?.currentUser;
    const { longUrl } = req.body;

    //? CHECK IF URL FORMAT IS CORRECT
    const checkFormatUrl = isUrl(longUrl);

    if (!checkFormatUrl) {
        res.status(400);
        res.render("urls/newUrl", {
            page: "new",
            email: currentUser.email,
            message: "The URL format is not correct, please check again",
        });
        return;
    }

    //? CHECK IF URL ALREADY EXIST FOR THE SAME USER
    if (isUrlExisting(urls, currentUser.id, longUrl)) {
        res.status(400);
        res.render("urls/newUrl", {
            page: "new",
            email: currentUser.email,
            message: "This URL already exists in your list",
        });
        return;
    }

    const newUrl = {
        id: urls.length + 1,
        user_id: currentUser.id,
        longUrl: longUrl,
        shortUrl: uniqueUrl(urls),
        visit_count: 0,
        unique_visit_count: 0,
        created_at: new Date(),
        originating_ip_address: [""],
    };

    urls.push(newUrl);

    res.redirect("/app/urls");
};

const renderEditUrl = (req: Request, res: Response) => {
    const { email } = req.session?.currentUser ?? "";
    const { id } = req.params;
    res.render("urls/editUrl", { id, email: email, page: "edit", message: "" });
};

const edit = (req: Request, res: Response) => {
    const { id } = req.params;
    const currentUser = req.session?.currentUser;
    const { longUrl } = req.body;

    //? CHECK IF URL FORMAT IS CORRECT
    const checkFormatUrl = isUrl(longUrl);
    if (!checkFormatUrl) {
        res.status(400);
        res.render("urls/editUrl", {
            page: "edit",
            email: currentUser?.email ?? "",
            id: id,
            message: "The URL format is not correct, please check again",
        });
        return;
    }

    //? CHECK IF URL ALREADY EXIST FOR THE SAME USER
    if (isUrlExisting(urls, currentUser.id, longUrl)) {
        res.status(400);
        res.render("urls/editUrl", {
            page: "edit",
            email: currentUser?.email ?? "",
            id: id,
            message:
                "This URL already exist in your list, please select a new one",
        });
        return;
    }

    //? CHECK IF USER IS THE OWNER OF THIS URL
    if (!isTheOwner(urls, currentUser.id, id)) {
        res.status(400);
        res.render("urls/editUrl", {
            page: "edit",
            email: currentUser?.email ?? "",
            id: id,
            message: "URL doesn't exist",
        });
        return;
    }

    //* UPDATING THE VALUE OF THE LONG URL
    urls[urls.findIndex((url) => url.id.toString() === id)].longUrl = longUrl;

    res.redirect("/app/urls");
};

const deleteUrl = (req: Request, res: Response) => {
    const currentUser = req.session?.currentUser;
    const { id } = req.params;

    if (!isTheOwner(urls, currentUser.id, id)) {
        res.status(400);
        res.render("urls/editUrl", {
            page: "edit",
            email: currentUser?.email ?? "",
            id: id,
            message: "URL doesn't exist",
        });
        return;
    }

    urls.splice(
        urls.findIndex((url) => url.id.toString() === id),
        1
    );

    res.redirect("/app/urls");
};

export default { index, renderNewUrl, create, edit, renderEditUrl, deleteUrl };

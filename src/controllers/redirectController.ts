import { Request, Response } from "express";
import { urls } from "../models/url";

const index = (req: Request, res: Response) => res.redirect("/app/urls");

const redirect = (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    if (shortUrl === "app") {
        res.redirect("/app/urls");
    }
    const targetIndex = urls.findIndex((url) => url.shortUrl === shortUrl);
    if (targetIndex <= -1) {
        res.status(404);
        throw new Error("Not found!!!");
    }

    //update metrix
    urls[targetIndex].visit_count += 1;
    const clientIp =
        ((req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress)
            ?.split(",")[0] //first one is the original ip address
            .trim() || "";
    if (!urls[targetIndex].originating_ip_address.includes(clientIp)) {
        urls[targetIndex].unique_visit_count += 1;
        urls[targetIndex].originating_ip_address.push(clientIp);
    }

    res.redirect(urls[targetIndex].longUrl);
    return;
};

export default { index, redirect };

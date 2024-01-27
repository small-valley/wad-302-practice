import { Url } from "../models/types/url";

//>> CHECK IF USER IS THE OWNER OF THIS URL
export const isTheOwner = (urls: Url[], currentUserId: string, id: string) =>
    urls[
        urls.findIndex((url) => url.id.toString() === id)
    ]?.user_id.toString() === currentUserId;

//>> CHECK IF URL ALREADY EXIST FOR THE SAME USER
export const isUrlExisting = (
    urls: Url[],
    currentUserId: string,
    longUrl: string
) =>
    urls.find(
        (url) => url.longUrl === longUrl && currentUserId === url.user_id
    );

import { Url } from "../models/types/url";

const genRand = (len: number = 6) => {
	return Math.random()
		.toString(36)
		.substring(2, len + 2);
};

//>> CHECK IF SHORT URL ALREADY EXIST AND CREATE A NEW RANDOM AND UNIQUE SHORT URL
export const uniqueUrl = (urls: Url[]) => {
	while (true) {
		const uniqueUrl = genRand();

		if (!urls.some((url) => url.shortUrl === uniqueUrl)) {
			return uniqueUrl;
		}
	}
};
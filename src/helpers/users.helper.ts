import bcrypt from "bcrypt";

//>> HASH SALT OPERATION & COMPARE PASSWORD

export const hashedPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt();
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (
	data: string | Buffer,
	encrypted: string,
): Promise<boolean> => {
	return bcrypt.compare(data, encrypted);
};

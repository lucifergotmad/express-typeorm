import bcrypt from "bcrypt";

export const hashPassword = async (password: string, saltLength: number) => {
  const salt = await bcrypt.genSalt(saltLength);
  return await bcrypt.hash(password, salt);
};

export const matchPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

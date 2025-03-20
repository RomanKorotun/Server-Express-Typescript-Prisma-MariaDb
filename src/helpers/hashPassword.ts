import bcryptjs from "bcryptjs";

const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, 10);
};

export default hashPassword;

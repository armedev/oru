import bcrypt from "bcrypt";

const salt = 10;

export const hashPassword = async (raw: string) => {
  try {
    const hashedPassword = await bcrypt.hash(raw, salt);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw new Error("Error hashing password");
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const validate = await bcrypt.compare(password, hashedPassword);
    return validate;
  } catch (err) {
    console.error(err);
    throw new Error("Error while validating password");
  }
};

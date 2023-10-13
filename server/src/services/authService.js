import * as authDao from "../models/authDao";
import * as bcrypt from "bcrypt";

export const signup = async (name, email, password) => {
  try {
    const validateEmail = new RegExp(
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    );

    if (!validateEmail.test(email)) {
      throw new Error("Invalid email formet.");
    }

    const exists = await authDao.getUserByEmail(email);

    if (exists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await authDao.signup(name, email, hashedPassword);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const deleteUser = async (userId) => {
  try {
    await authDao.deleteUser(userId);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

import * as authDao from "../models/authDao";

export const signup = async (name, email, password) => {
  try {
    await authDao.signup(name, email, password);
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

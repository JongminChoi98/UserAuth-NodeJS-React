import * as authService from "../services/authService";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Something is missing");
    }

    await authService.signup(name, email, password);

    return res.status(201).json({ message: "Signup Success!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Something is missing");
    }

    const token = await authService.login(email, password);

    res.cookie("token", token);
    return res.status(200).json({ message: "Login Success!" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    return res.json({ message: " ", name: req.name });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout Success" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    await authService.deleteUser(userId);

    return res.json({ message: "Delete Success!" });
  } catch (error) {
    next(error);
  }
};

import * as authService from "../services/authService";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await authService.signup(name, email, password);

    res.json({ message: "Signup Success!" });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await authService.deleteUser(userId);

    res.json({ message: "Delete Success!" });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

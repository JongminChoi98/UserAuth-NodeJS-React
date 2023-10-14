import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "We need token. Please provide it" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Authentication Error." });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

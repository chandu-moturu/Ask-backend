import jwt from "jsonwebtoken";
import "dotenv/config";
import asyncHandler from "express-async-handler";
const auth = asyncHandler(async (req, res, next) => {
 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      let decodeData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodeData?.id;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Authentication failed" });
    }
  }
});

export default auth;

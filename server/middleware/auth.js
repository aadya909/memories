import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (isCustomAuth) {
      // JWT signed by our backend
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      // Google OAuth JWT
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token: user ID not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;

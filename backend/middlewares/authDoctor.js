import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dtoken = req.headers.token;
    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not Authorized, login again" });
    }

    // verify token
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // optionally attach to req if needed
    req.docId = decoded.id; 

    // ✅ allow frontend to send userId in body, so we don’t override it
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authDoctor;

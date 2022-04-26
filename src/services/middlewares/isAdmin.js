import { verifyJWT } from "../../utils";

export const isAdmin = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { role } = verifyJWT(token);
  if (role > 0) return next();
  else
    return res.json({
      data: {},
      success: false,
      message: "Access Denied",
    });
};

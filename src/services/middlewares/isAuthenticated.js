import { verifyJWT } from "../../utils";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const data = verifyJWT(token);
  if (data) return next();
  return res.json({
    data: {},
    success: false,
    message: "Unauthorised",
  });
};

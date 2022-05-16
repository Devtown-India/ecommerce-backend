import { verifyJWT } from "../../utils";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const data = verifyJWT(token);

    if (data) {
      req.user = data.id;
      return next();
    }
    return res.json({
      data: {},
      success: false,
      message: "Unauthorised",
    });
  } catch (error) {
      return res.json({
      data: {},
      success: false,
      message: "Unauthorised",
    });
  }
};

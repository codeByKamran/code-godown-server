import User from "../models/auth/userModal.js";
import jwt from "jsonwebtoken";
import config from "../config/env.js";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.statusMessage = "Token Unavailable via cookie";
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // forbidden

  try {
    // is refresh token in db
    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET_KEY,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
          // forbidden
          res.statusMessage =
            "Token could not be verified. Probably counterfiet";
          return res.sendStatus(403);
        }

        const roles = Object.values(foundUser?.roles);

        const accessToken = jwt.sign(
          {
            username: decoded.username,
            _id: decoded._id,
            roles,
          },
          config.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: "100s" }
        );
        let tempUser = {
          ...{ ...foundUser._doc }, // excluding refresh token from res
          accessToken,
        };

        // deleting not safe info to prevent sending to client
        delete tempUser.refreshToken;
        delete tempUser.pswd;
        delete tempUser.__v;
        res.statusMessage = "Token Refresh Successfull";
        res.status(200).json({ ...tempUser });
      }
    );
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

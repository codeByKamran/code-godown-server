import User from "../models/auth/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/env.js";

export const loginUser = async (req, res) => {
  const { pswd, email } = req.body;
  if ((!pswd, !email)) {
    res.statusMessage = "Email and password are required";
    return res.sendStatus(400); // bad request
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    // unauthorized
    res.statusMessage = "User not found with these credentials";
    return res.sendStatus(401);
  }

  try {
    // user found in db
    const passMatch = await bcrypt.compare(pswd, foundUser.pswd);
    if (passMatch) {
      // password matched with user in db
      // create jwt for client including user roles
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          username: foundUser._doc.username,
          _id: foundUser._doc._id,
          roles,
        },
        config.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "100s" }
      );

      const refreshToken = jwt.sign(
        {
          username: foundUser._doc.username,
          _id: foundUser._doc._id,
          roles,
        },
        config.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "3d" }
      );

      // sending refresh token in httpOnly cooky(not accessible with js)
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      foundUser.refreshToken = refreshToken;
      const updatedUser = await foundUser.save();

      let tempUser = {
        ...{ ...updatedUser._doc }, // excluding refresh token from res
        accessToken,
      };

      delete tempUser.refreshToken; // in case passed anyway
      delete tempUser.pswd;
      delete tempUser.__v;

      res.statusMessage = "Login Successfull";
      res.status(202).json({
        user: tempUser,
      });
    } else {
      res.statusMessage = "Password is incorrect";
      return res.sendStatus(401); // unauthorized
    }
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

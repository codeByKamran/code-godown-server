import User from "../models/auth/userModal.js";

export const handleLogout = async (req, res) => {
  // on cliet, also delete accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.statusMessage = "Logged out Successfully";
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.statusMessage = "Logged out Successfully";
  res.sendStatus(204);
};

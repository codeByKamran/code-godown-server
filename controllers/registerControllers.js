import bcrypt from "bcrypt";
import User from "../models/auth/userModal.js";

export const registerNewUser = async (req, res) => {
  const { username, pswd, email } = req.body;

  if (!username && !pswd && !email) {
    res.statusMessage = "Failed to Register. Important Fields are missing";
    return res.sendStatus(400); // bad request
  }

  const duplicateUserName = await User.findOne({ username }).exec();
  const duplicateEmail = await User.findOne({ email }).exec();

  if (duplicateUserName) {
    //conflict
    res.statusMessage = "username already taken";
    return res.sendStatus(409);
  } else if (duplicateEmail) {
    //conflict
    res.statusMessage = "email already taken";
    return res.sendStatus(409);
  }
  try {
    const hashedPswd = await bcrypt.hash(pswd, 10);
    const user = { ...req.body, pswd: hashedPswd }; // [user] role will be added automatically

    const createdUser = await User.create(user);

    if (createdUser) {
      res.statusMessage = "Registered successfully";
      res.status(201).send(createdUser);
    } else {
      res.statusMessage = "unable to register";
      res.sendStatus(500);
    }
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

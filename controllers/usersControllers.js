import User from "../models/auth/userModal.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) {
      res.statusMessage = "No Users Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Users Found";
    res.status(200).json({ users });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id).exec();
    if (!foundUser) {
      res.statusMessage = "Data not found";
      return res.sendStatus(204);
    }

    res.statusMessage = "Data found";
    res.status(200).json({ foundUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getUserByUserName = async (req, res) => {
  const username = String(req.params.username).startsWith("@")
    ? String(req.params.username).slice(1)
    : req.params.username;

  try {
    const foundUser = await User.find({ username }).exec();
    if (!foundUser) {
      res.statusMessage = "Data not found";
      return res.sendStatus(204);
    }

    res.statusMessage = "Data found";
    console.log({ foundUser });
    res.status(200).json({ foundUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id || req.body.id;

  const foundUser = await User.findById(id).exec();
  if (!foundUser) {
    res.statusMessage = "Not Found";
    res.sendStatus(404);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updatedUser) {
      res.statusMessage = "Unable to update";
      res.sendStatus(500);
    }

    res.statusMessage = "Updated";
    res.status(201).json({ updatedUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id || req.body.id;

  const foundUser = await User.findById(id).exec();
  if (!foundUser) return res.status(204).statusMessage("Not Found");

  try {
    const deletedUser = await User.findByIdAndRemove(id).exec();

    if (!deletedUser)
      return res
        .status(500)
        .json({ message: `Unable to delete user with ID: ${id}` });

    res.status(200).json({ message: "User Deleted Successfully", deletedUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

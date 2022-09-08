import User from "../models/auth/userModal.js";
import Label from "../models/labelModal.js";

export const addLabel = async (req, res) => {
  const userID = req.body.userID;
  const label = req.body.label;

  try {
    const added = await Label.create(label);

    if (!added) {
      res.statusMessage = "Unable to post";
      return res.sendStatus(500);
    }

    const foundUser = await User.findById(userID).exec();
    if (!foundUser) {
      res.statusMessage = "Not Found";
      res.sendStatus(404);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { labels: [...foundUser.labels, added._doc._id] },
      {
        new: true,
      }
    ).exec();

    if (!updatedUser) {
      res.statusMessage = "Unable to update";
      res.sendStatus(500);
    }

    res.statusMessage = "Added successfully";
    res.status(201).json({ added, updatedUser });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getLabels = async (req, res) => {
  try {
    const found = await Label.find().exec();
    if (!found) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getManyLabels = async (req, res) => {
  const ids = req.body.ids;
  try {
    const result = await Label.find({
      _id: { $in: ids },
    });

    if (!result) {
      res.statusMessage = "Nothing Found";
      return res.sendStatus(204);
    }
    res.statusMessage = "Data Found";
    res.status(200).json({ result });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const getLabelById = async (req, res) => {
  const id = req.params.id;
  try {
    const found = await Label.findOne({ slug: id }).exec();
    if (!found) {
      res.statusMessage = "Data Found";
      return res.sendStatus(204);
    }

    res.status(200).json({ message: `Found`, found });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const updateLabel = async (req, res) => {
  const id = req.params.id || req.body.id;

  try {
    const updated = await Label.findOneAndUpdate({ slug: id }, req.body, {
      new: true,
    }).exec();

    if (!updated) {
      res.statusMessage = "Not Found";
      return res.sendStatus(404);
    }
    res.statusMessage = "Updated";
    res.status(201).json({ updated });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

export const deleteLabel = async (req, res) => {
  const id = req.params.id || req.body.id;
  const found = await Label.findById(id).exec();
  if (!found) {
    res.statusMessage = "Not Found";
    return res.sendStatus(404);
  }

  try {
    const deleted = await Label.findByIdAndDelete(id).exec();

    if (!deleted) {
      res.statusMessage = "Unable to delete";
      return res.sendStatus(500);
    }
    res.statusMessage = "Deleted";
    res.status(200).json({ deleted });
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

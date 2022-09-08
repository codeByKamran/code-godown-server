import Snippet from "../../models/snippetModal.js";

export const getSnippetsByIds = async (ids) => {
  try {
    const result = await Snippet.find({
      _id: { $in: ids },
    }).sort([["updatedAt", -1]]);

    if (!result) {
      return;
    }

    return result;
  } catch (err) {
    res.statusMessage = err.message;
    res.sendStatus(500);
  }
};

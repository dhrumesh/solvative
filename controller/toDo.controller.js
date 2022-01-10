const { toDoModel } = require("../models/toDo.models");
const { userModel } = require("../models/user.model");

const {
  toDoValidation,
  updateToDoValidation,
  statusValidation,
} = require("../middlewares/validation");
const mongoose = require("mongoose");

const addTodo = async (req, res) => {
  try {
    const id = req.user._id;

    const { error } = toDoValidation(req.body);
    if (error) return res.status(422).json({ message: error.message });

    const user = await userModel.findById(id);
    if (!user) return res.status(422).json({ message: "user is not valid" });

    const todo = new toDoModel({
      title: req.body.title,
      status: req.body.status,
      content: req.body.content,
      userId: id,
    });

    const saved = await todo.save();

    res.status(201).json({ todo: saved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.user._id;

    const { error } = updateToDoValidation(req.body);
    if (error) return res.status(422).json({ message: error.message });

    const user = await toDoModel.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(422).json({ message: "user is not valid" });

    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.user._id;
    if (!req.body.id)
      return res.status(422).json({ message: "todo id is required" });

    if (!mongoose.Types.ObjectId.isValid(req.body.id))
      return res.status(422).json({ message: "invalid id" });

    const user = await userModel.findById(id);
    if (!user) return res.status(422).json({ message: "user is not valid" });

    if (user.isAdmin == false)
      return res.status(422).json({ message: "you are not able to delete" });

    const { error } = updateToDoValidation(req.body);
    if (error) return res.status(422).json({ message: error.message });

    await toDoModel.remove({ _id: req.body.id });

    res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allList = async (req, res) => {
  try {
    const id = req.user._id;
    const params = req.params.status;

    const { error } = statusValidation({ status: params });
    if (error) return res.status(422).json({ message: error.message });

    const user = await userModel.findById(id);
    if (!user) return res.status(422).json({ message: "user is not valid" });

    if (user.isAdmin == false)
      return res
        .status(404)
        .json({ message: "you are not able get this data" });

    const all = await toDoModel
      .find({ status: params })
      .populate("userId", "name");

    res.status(200).send({ todo: all });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.user._id;

    const user = await userModel.findById(id);

    if (!user) return res.status(422).json({ message: "user is not valid" });

    const todo = await toDoModel.find({ userId: id });

    res.status(200).json({ todo: todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addTodo,
  updateTodo,
  deleteTodo,
  allList,
  getTodo
};

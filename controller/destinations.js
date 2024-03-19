const Destination = require("../models/destinations");
const User = require("../models/users");

const getAllDestinations = async (req, res) => {
  try {
    const { limit } = req.query;

    if (limit) {
      const allDestinations = await Destination.find({}).sort({_id: -1}).limit(limit);
      res.status(200).json({ allDestinations });
      return
    }

    const allDestinations = await Destination.find({});
    res.status(200).json({ allDestinations });

  } catch (error) {
    res.status(500).json({ status: "Unsuccessful", message: error });
  }
};

const getDestination = async (req, res) => {
  try {
    const id = req.params.id;
    const destination = await Destination.findById(id);
    res.status(200).json({status: "Successful", message: destination});
  } catch (error) {
    res.status(500).json({ status: "Unsuccessful", message: error });
  }
};

const postDestination = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const destination = new Destination({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        images: [],
      });

      if (req.files) {
        req.files.forEach((img) => {
          destination.images.push(img.path);
        });
      }
      await destination.save();
      res
        .status(201)
        .json({ status: "Successful", message: "Successfully Added." });
    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

const updateDestination = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const { id: destinationID } = req.params;
      const result = await Destination.findByIdAndUpdate(
        { _id: destinationID },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!result) {
        res.status(404).json({ msg: "Destination ID not found." });
      }
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

const deleteDestination = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const { id: destinationID } = req.params;
      if (!destinationID) {
        res.status(404).json({ msg: "Destination ID not found." });
        return;
      }
      const result = await Destination.findByIdAndDelete({
        _id: destinationID,
      });

      if (result) {
        res
          .status(200)
          .json({ status: "Successful", message: "Deleted Successful" });
        return;
      }
      res
        .status(500)
        .json({ status: "Unsuccessful", message: "Internal Server Error" });
    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

module.exports = {
  getAllDestinations,
  getDestination,
  postDestination,
  updateDestination,
  deleteDestination,
};

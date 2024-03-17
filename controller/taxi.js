const Taxi = require("../models/taxi");
const User = require("../models/users");

const getTaxies = async (req, res) => {
  try {
    const response = await Taxi.find({});
    if (response) {
      res
        .status(200)
        .json({ status: "Successful", message: response });
      return;
    }
    res
      .status(400)
      .json({ status: "Unsuccessful", message: "Internal Error Occured." });
  } catch (error) {
    console.log("Taxi: ", error);
  }
};

const createTaxi = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const taxi = new Taxi({
        name: req.body.name,
        type: req.body.type,
        number: req.body.number,
        image: "",
      });

      if (req.file) {
        taxi.image = req.file.path;
      }

      const response = await taxi.save();

      if (response) {
        res
          .status(201)
          .json({ status: "Successful", message: "Created Successful" });
        return;
      }
      res
        .status(400)
        .json({ status: "Unsuccessful", message: "Error while adding taxi." });
    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

const deleteTaxi = async (req, res) => {
  const id = req.params.id;
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const response = await Taxi.findByIdAndDelete(id);
      if (response) {
        res
          .status(201)
          .json({ status: "Successful", message: "Deleted Successful" });
        return;
      }
      res
        .status(400)
        .json({
          status: "Unsuccessful",
          message: "Error while deleting taxi.",
        });
    } catch (error) {
      console.log("Taxi: ", error);
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

module.exports = {
  getTaxies,
  createTaxi,
  deleteTaxi,
};

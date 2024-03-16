const Package = require("../models/packages");
const User = require("../models/users");

const getPackages = async (req, res) => {
  const allPackages = await Package.find({});
  res.status(200).json({ allPackages });
};

const getPackage = async (req, res) =>{
    const id = req.params.id;
    const package = await Package.findById(id)
    if (package) {
        res.status(200).json({status: "Successful", message: package});
        return;
    }
    res.status(400).json({status: "Unsuccessful", message: "Not Found"});
}

const postPackage = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const package = new Package({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        destinations: req.body.destinations,
        time: req.body.time,
        description: req.body.description,
        thumbnail: "",
      });
      if (req.file) {
        package.thumbnail = req.file.path;
      }
      
      const response = await package.save();

      if (response) {
          res
          .status(201)
          .json({ status: "Successful", message: "Package Created Successful" });
          return;
        }
        res
        .status(400)
        .json({ status: "Unsuccessful", message: "Error while creating package." });

    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

const updatePackage = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const { id: packageID } = req.params;
      if (!packageID) {
        res.status(404).json({ msg: "Package ID not found." });
      }
      const result = await Package.findByIdAndUpdate(packageID, req.body);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

const deletePackage = async (req, res) => {
  const userid = req.user.userID;
  const user = await User.findById(userid);

  if (user.role == "ADMIN") {
    try {
      const { id: packageID } = req.params;
      if (!packageID) {
        res.status(404).json({ msg: "Package ID not found." });
      }
      const result = await Package.findByIdAndDelete({ _id: packageID });
      if (result) {
          res.status(200).json({ status: "Successful", message: "Package Deleted Successfully" });
          return;
        }
        res.status(200).json({ status: "Unsuccessful", message: "There is an Error" });

    } catch (error) {
      res.status(500).json({ status: "Unsuccessful", message: error });
    }
  } else {
    res.status(401).json({ status: "Unsuccessful", message: "Not Authorized" });
  }
};

module.exports = {
  getPackages,
  getPackage,
  postPackage,
  updatePackage,
  deletePackage,
};

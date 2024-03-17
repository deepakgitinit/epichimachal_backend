const Pickup = require("../models/pickup");

const fetchPickups = async (req, res) =>{
    try {
        const response = await Pickup.find({})
        if (response) {
            res
              .status(200)
              .json({ status: "Successful", message: response });
            return;
          }
          res
            .status(400)
            .json({ status: "Unsuccessful", message: "Internal Error" });

    } catch (error) {
        console.log("Pickup: ", error);
    }
}

const createPickup = async (req, res) =>{
    try {
        const pickup = new Pickup({
            name: req.body.name,
        })
        const response = await pickup.save();
        if (response) {
            res
                .status(201)
                .json({status: "Successful", message: "Created Successful"})
                return
        }
        else{
            res
                .status(200)
                .json({status: "Unsccessful", message: "Internal Server Error"})
                return
        }

    } catch (error) {
        console.log("Pickup: ", error);
    }
}

const deletePickups = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await Pickup.findByIdAndDelete(id);
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
          message: "Error while deleting pickup.",
        });
    } catch (error) {
        console.log("Pickup: ", error);
    }
}

module.exports = {
    createPickup,
    fetchPickups,
    deletePickups
}
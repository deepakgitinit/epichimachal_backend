const sendItineraryMail = require("../middlewares/itinerary")

const sendItinerary = async(req, res) =>{
    try {
        
        const {mails, subject, htmlContent} = req.body;
        const response = await sendItineraryMail(mails, subject, htmlContent);
        
        if (response) {
          res
            .status(200)
            .json({ status: "Successful", message: "Mail send successful." });
          return;
        }
        res
          .status(406)
          .json({ status: "Unsuccesful", message: "There is an error occured." });
    
      } catch (error) {
        res.status(404).json({ status: "Unsuccessful", message: error });
      }

}

module.exports = {
    sendItinerary,
}
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let folderName = req.body.title || req.user.userID;
      folderName = folderName.split(" ").join("-");
      const uploadDirectory = `public/data/uploads/${folderName}`;

      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory);
      }

      cb(null, uploadDirectory);
      
    } catch (error) {
      console.log(error);
    }
  },

  filename: function (req, file, cb) {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);

    } catch (error) {
      console.log(error);
    } 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

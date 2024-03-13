const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderName = req.body.title  || req.user.userID;
        folderName = folderName.split(" ").join("-");
        const uploadDirectory = `public/data/uploads/${folderName}`

        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }

        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload
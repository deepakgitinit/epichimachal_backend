const sharp = require("sharp");
const fs = require("fs");

const processImage = async (req, res, next) => {
    if (!req.file) {
      return next();
    }
  
    const { path: filePath, filename } = req.file;
    const outputFilePath = filePath.replace(/\.[^/.]+$/, "") + ".webp";
  
    try {
      await sharp(filePath)
        .resize(1280, 720)
        .toFormat('webp', { quality: 50 })
        .toFile(outputFilePath);
  
      // Remove the original file
      // fs.unlinkSync(filePath);
  
      // Update the file path to the new file
      req.file.path = outputFilePath;
      req.file.filename = filename.replace(/\.[^/.]+$/, "") + ".webp";
      next();
  
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  module.exports = processImage;
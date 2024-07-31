const sharp = require("sharp");
const fs = require("fs");

const processImages = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }
  
    try {
      await Promise.all(req.files.map(async (file) => {
        const { path: filePath, filename } = file;
        const outputFilePath = filePath.replace(/\.[^/.]+$/, "") + ".webp";
  
        await sharp(filePath)
          .resize(1280, 720)
          .toFormat('webp', { quality: 50 })
          .toFile(outputFilePath);
  
        // Remove the original file
        // fs.unlinkSync(filePath);
  
        // Update the file path to the new file
        file.path = outputFilePath;
        file.filename = filename.replace(/\.[^/.]+$/, "") + ".webp";
      }));
  
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  
  module.exports = processImages;
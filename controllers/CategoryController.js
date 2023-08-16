const CategoryModel = require('../modals/category')
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dxhsy70tz",
    api_key: "743486792624739",
    api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
  });

class Categorycontroller {
  static category = async (req, res) => {
    const file = req.files.image;

    //console.log(file)
    const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "vasu",
      width: 400,
    });

    try {
      const data = new CategoryModel({
        name: req.body.name,
        image: {
          public_id: image_upload.public_id,
          url: image_upload.secure_url,
        },
      });
      await data.save();
      //res.send(req.body)
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static catdisplay = async (req, res) => {
    const data = await CategoryModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  };

  static catdelete = async (req, res) => {
    const result = await CategoryModel.findById(req.params.id);
    //console.log(result)
    const imgdata = result.image;
    //console.log(imgdata)
    await cloudinary.uploader.destroy(imgdata);
    try {
      const data = await CategoryModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Categorycontroller;
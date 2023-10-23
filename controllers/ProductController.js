const ProductModel = require("../modals/product");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
});

class Productcontroller {
  static product = async (req, res) => {
    const file = req.files.image;

    //console.log(file)
    const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "product",
      width: 400,
    });

    try {
      const data = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        rating: req.body.rating,
        category: req.body.category,
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

  static prodisplay = async (req, res) => {
    const data = await ProductModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  };

  static prodelete = async (req, res) => {
    const result = await ProductModel.findById(req.params.id);
    //console.log(result)
    const imgdata = result.image;
    //console.log(imgdata)
    await cloudinary.uploader.destroy(imgdata);
    try {
      const data = await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static product_update = async (req, res) => {
    // console.log(req.params.id)
    try {
      // console.log(req.files.image)

      if (req.files) {
        const user = await ProductModel.findById(req.params.id);
        const image_id = user.image;
        // console.log(image_id)
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const image_upload = await cloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "product",
            width: 400,
          }
        );
        var data = {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          rating: req.body.rating,
          category: req.body.category,
          image: {
            public_id: image_upload.public_id,
            url: image_upload.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
          rating: req.body.rating,
          category: req.body.category,
        };
      }
      const update_category = await ProductModel.findByIdAndUpdate(
        req.params.id,
        data
      );
      await update_category.save();
      res
        .status(201)
        .json({ status: "Success", message: "product Update successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static productdetail = async (req, res) => {
    const productdetail = await ProductModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      productdetail,
    });
  };
}
module.exports = Productcontroller;

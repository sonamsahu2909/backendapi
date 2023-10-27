const SliderModel = require('../modals/slider')
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dxhsy70tz",
    api_key: "743486792624739",
    api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
  });

class Slidercontroller {
    static sliderInsert = async (req, res) => {
        const file = req.files.image;
    
        //console.log(file)
        const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "slider",
          width: 400,
        });
    
        try {
          const data = new SliderModel({
            title: req.body.title,
            description: req.body.description,
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
    
      static sliderdisplay = async (req, res) => {
        const data = await SliderModel.find();
        res.status(200).json({
          success: true,
          data,
        });
      };

      static sliderdelete = async (req, res) => {
        const result = await SliderModel.findById(req.params.id);
        //console.log(result)
        const imgdata = result.image;
        //console.log(imgdata)
        await cloudinary.uploader.destroy(imgdata);
        try {
          const data = await SliderModel.findByIdAndDelete(req.params.id);
          res.status(200).json({
            success: true,
            message: "Delete Successfully",
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      static slider_update = async (req, res) => {
        // console.log(req.params.id)
        try {
          // console.log(req.files.image)
    
          if (req.files) {
            const user = await SliderModel.findById(req.params.id);
            const image_id = user.image;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id);
    
            const file = req.files.image;
            const image_upload = await cloudinary.uploader.upload(
              file.tempFilePath,
              {
                folder: "slider",
                width: 400,
              }
            );
            var data = {
              title: req.body.title,
              description: req.body.description,
              image: {
                public_id: image_upload.public_id,
                url: image_upload.secure_url,
              },
            };
          } else {
            var data = {
              title: req.body.title,
              description: req.body.description,
            };
          }
          const update_slider = await SliderModel.findByIdAndUpdate(
            req.params.id,
            data
          );
          await update_slider.save();
          res
            .status(201)
            .json({ status: "Success", message: "slider Update successfully" });
        } catch (error) {
          console.log(error);
        }
      };
}

module.exports = Slidercontroller;
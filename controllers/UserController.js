const UserModal = require("../modals/user");
const ProductModal = require("../modals/product");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
});

class UserController {
  static userinsert = async (req, res) => {
    // console.log(req.files.image)
    // console.log(req.body)
    const file = req.files.image;
    const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "studentimage",
    });
    // console.log(imageUpload)
    const { name, email, password, cpassword } = req.body;
    const user = await UserModal.findOne({ email: email });
    //console.log(user)
    if (user) {
      res
        .status(401)
        .json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
    } else {
      if (name && email && password && cpassword) {
        if (password == cpassword) {
          try {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModal({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });

            await result.save();

            res.status(201).json({
              status: "Success",
              message: "Ragistration Successfully",
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(401).json({
            status: "failed",
            message: "Password and confirm password does not match",
          });
        }
      } else {
        res
          .status(201)
          .json({ status: "failed", message: "All field are required" });
      }
    }
  };

  static verify_login = async (req, res) => {
    try {
      //console.log(req.body)

      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModal.findOne({ email: email });
        // console.log(user)
        if (user != null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            const token = jwt.sign({ ID: user._id }, "shivanibansal@123#8962");
            res.cookie("token", token);
            res
              .status(200)
              .json({
                status: "Success",
                message: "Login Successfully",
                token,
                user,
              });
          } else {
            res
              .status(401)
              .json({
                status: "failed",
                message: "Email password is not valid",
              });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "You are not register user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "All field are required" });
      }
    } catch (error) {
      console.log("error");
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.send("logout successfully");
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      res.render("profile", {
        n: name,
        e: email,
        image: image,
        message: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static get_user_detail = async (req, res) => {
    try {
      // console.log(req.user);
      const user = await UserModal.findById(req.user.id);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static get_all_user = async (req, res) => {
    try {
      // console.log(req.user);
      const getalluser = await UserModal.find();

      res.status(200).json({
        success: true,
        getalluser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static change_password = async (req, res) => {
    try {
      // const { name, email, id, image } = req.user
      // console.log(req.body)
      const { oldpassword, newpassword, cpassword, user_id } = req.body;
      if (oldpassword && newpassword && cpassword) {
        const user = await UserModal.findById({ _id: user_id });
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          res
            .status(400)
            .json({ status: "Failed", message: "Old Password is incorrect" });
        } else {
          if (newpassword !== cpassword) {
            res
              .status(400)
              .json({
                status: "Failed",
                message: "Password and confirm password is not matched",
              });
          } else {
            const newHashpassword = await bcrypt.hash(newpassword, 10);
            await UserModal.findByIdAndUpdate(
              { _id: user_id },
              {
                $set: { password: newHashpassword },
              }
            );

            res
              .status(201)
              .json({
                status: "Success",
                message: "Password Change successfully",
              });
          }
        }
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "All field are required" });
      }
    } catch (error) {
      console.log("error");
    }
  };

  static profile_update = async (req, res) => {
    try {
      //console.log(req.files.image)
      if (req.files) {
        const user = await UserModal.findById(req.user.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "studentimage",
        });
        var data = {
          name: req.body.name,
          email: req.body.email,
          number:req.body.number,
          gender:req.body.gender,
          state:req.body.state,
          city:req.body.city,
          pincode:req.body.pincode,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
          number:req.body.number,
          gender:req.body.gender,
          state:req.body.state,
          city:req.body.city,
          pincode:req.body.pincode,
        };
      }
      const update_profile = await UserModal.findByIdAndUpdate(
        req.user.id,
        data
      );
      // console.log(update_profile);
      res.status(201)
      .json({ status: "Success", message: "Profile Update successfully" });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;

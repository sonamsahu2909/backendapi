const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
},
{ timestamps: true }
);


const SliderModel = mongoose.model("slider", sliderSchema);
module.exports = SliderModel;
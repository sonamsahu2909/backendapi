const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
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


const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;
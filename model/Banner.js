const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    link: String,
    sequence: Number
  },
  {
    collection: "Banner"
  }
);

/*class BannerModel {
  
}
schema.loadClass(BannerModel);*/
module.exports = mongoose.connection.model("Banner", schema);

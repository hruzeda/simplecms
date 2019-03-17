const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    image: String,
    thumb: String,
    title: String,
    content: String
  },
  {
    collection: "Page"
  }
);

/*class PageModel {
  
}
schema.loadClass(UserModel);*/
module.exports = mongoose.connection.model("Page", schema);

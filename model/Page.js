const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    collection: "Page"
  }
);

/*class PageModel {
  
}
schema.loadClass(PageModel);*/
module.exports = mongoose.connection.model("Page", schema);

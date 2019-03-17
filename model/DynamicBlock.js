const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: String,
    page: Number
  },
  {
    collection: "DynamicBlock"
  }
);

/*class DynamicBlockModel {
  
}
schema.loadClass(DynamicBlockModel);*/
module.exports = mongoose.connection.model("DynamicBlock", schema);

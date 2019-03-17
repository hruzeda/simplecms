const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    collection: "Post"
  }
);

/*class PostModel {
  
}
schema.loadClass(PostModel);*/
module.exports = mongoose.connection.model("Post", schema);

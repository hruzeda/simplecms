const mongoose = require("mongoose");
const pbkdf2 = require("pbkdf2");
const randomBytes = require("random-bytes");

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    salt: String,
    encrypted_password: String
  },
  {
    collection: "User"
  }
);

class UserModel {
  get password() {
    return this.encrypted_password;
  }

  set password(password) {
    this.salt = randomBytes.sync(16).toString("hex");
    this.encrypted_password = pbkdf2
      .pbkdf2Sync(password, this.salt, 16, 16, "sha512")
      .toString("hex");
  }

  static authenticate(email, password, callback) {
    this.findOne(
      {
        email
      },
      (err, user) => {
        user.password = password;
        if (err) callback(new Error("User not found."));
        callback(
          user.password ===
          pbkdf2
            .pbkdf2Sync(password, user.salt, 16, 16, "sha512")
            .toString("hex")
            ? user
            : new Error("Wrong password.")
        );
      }
    );
  }
}

schema.loadClass(UserModel);
module.exports = mongoose.connection.model("User", schema);

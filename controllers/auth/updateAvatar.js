const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models/users");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();

  const filename = `${_id}.${extention}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  Jimp.read("avatarUrl")
    .then((image) => {
      return image.resize(250, 250).write(resultUpload);
    })
    .catch((err) => {
      console.log(err);
    });
  const avatarUrl = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};
module.exports = updateAvatar;
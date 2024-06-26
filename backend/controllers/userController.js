// const { post } = require("../routes/userRoutes");
const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already in use", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already in use", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete newUser.password;
    return res.json({ msg: "ok", status: true, user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // Change here
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password); // Change here
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const userId = req.params.userId;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(userId, {
//       isAvatarImageSet: true,
//       avatarImage,
//     });
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const userId = req.params.id;
//     const avatarImage = req.body.image;

//     // Update user data with avatar information
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       { $set: { isAvatarImageSet: true, image: avatarImage } }, // Update with image and isSet flag
//       { new: true } // Return the updated document
//     );
//     console.log(userData);

//     // Check if user data was found and updated
//     if (!userData) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Log isSet value
//     console.log("isSet:", userData.isAvatarImageSet);

//     // Send response with updated user data
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (error) {
//     // Handle any errors
//     next(error);
//   }
// };

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // console.log(req.params.id);

    const avatar = req.body.image;
    // console.log(avatar);
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        // ...avatarImage,
        avatarImage: avatar,
      },

      { new: true }
    );
    return res.json({
      // isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
      msg: "ok",
      status: true,
      user: userData,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    console.error(error);
  }
};

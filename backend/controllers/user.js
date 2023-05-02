const User = require('../models/User');
const cloudinary = require('cloudinary');

exports.signUp = async (req, res) => {
    try {
      const { name, email, password, confirmpassword } = req.body;
  
      let user = await User.findOne({ email }).select("+password");
      if(password !== confirmpassword){
        return res.status(400).json({
          success: false,
          message: "Password does not match",
        });
      }

      if (user) {
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect Password",
          });
        }
      } else {
        user = await User.create({
          name,
          email,
          password,
          confirmpassword,
        });
      }
  
      const token = await user.generateToken();
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.logout = async (req, res) => {
    try {
      const options = { expires: new Date(Date.now()), httpOnly: true };
  
      res.status(200).cookie("token", null, options).json({
        success: true,
        message: "Logged Out",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.myProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      if (user.avatar && user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "DigiLabs",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
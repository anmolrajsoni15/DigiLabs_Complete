const Page = require("../models/Page");
const cloudinary = require("cloudinary");

exports.updatePageData = async (req, res) => {
  try {
    const { image, text } = req.body;
    const page = await Page.findOne({ owner: req.user._id });
    if (page) {
      page.text = text;
      if (image) {
        await cloudinary.v2.uploader.destroy(page.image.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "DigiLabs",
        });
        page.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

      await page.save();
      res.status(200).json({
        success: true,
        page,
      });
    } else {
        let imageUrl = "DefaultImage"
        if(image){
            const myCloud = await cloudinary.v2.uploader.upload(image, {
              folder: "DigiLabs",
            });
            imageUrl = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
      const page = await Page.create({
        text,
        image: imageUrl,
        owner: req.user._id,
      });
      res.status(201).json({
        success: true,
        page,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getPageData = async (req, res) => {
  try {
    const page = await Page.findOne({ owner: req.user._id });
    if (page) {
      res.status(200).json({
        success: true,
        page,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
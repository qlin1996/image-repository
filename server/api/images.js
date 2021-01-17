const router = require('express').Router();
const { Image } = require('../db/models');
module.exports = router;
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid').v4;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const upload = multer({ storage }).single('image');

// GET /api/images
router.get('/', async (req, res, next) => {
  try {
    const images = await Image.findAll({ limit: 10 });
    res.json(images);
  } catch (err) {
    next(err);
  }
});

// GET /api/images/searchedPhrase
router.get('/:searchedPhrase', async (req, res, next) => {
  try {
    const images = await Image.findAll({
      where: { title: req.params.searchedPhrase },
    });
    res.json(images);
  } catch (err) {
    next(err);
  }
});

// POST /api/images
router.post('/', upload, async (req, res, next) => {
  try {
    let myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        // const imageInfo = {
        //   fileLink: data.Location,
        //   title: req.body.title,
        //   tags: req.body.tags
        // }
        // await Image.create(imageInfo)

        res.status(200).send(data);
      }
    });
  } catch (error) {
    next(err);
  }
});

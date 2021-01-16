const router = require('express').Router();
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

// POST /api/upload
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
      res.status(200).send(data);
    });
  } catch (error) {
    next(err);
  }
});
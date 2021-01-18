const router = require('express').Router();
const { Image } = require('../db/models');
module.exports = router;
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const { Op } = require('sequelize');

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
  } catch (error) {
    next(error);
  }
});

// GET /api/images/liked
router.get('/liked', async (req, res, next) => {
  try {
    const images = await Image.findAll({ where: { liked: true } });
    res.json(images);
  } catch (error) {
    next(error);
  }
});

// GET /api/images/search?tag=
router.get('/search', async (req, res, next) => {
  try {
    const images = await Image.findAll({
      where: {
        tags: { [Op.contains]: [req.query.tag] },
      },
    });
    res.json(images);
  } catch (error) {
    next(error);
  }
});

// GET /api/images/:id/similar
router.get('/:id/similar', async (req, res, next) => {
  try {
    const image = await Image.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (image === null) {
      res.sendStatus(404);
    } else {
      const similar = await Image.findAll({
        where: {
          id: { [Op.ne]: image.id },
          tags: { [Op.overlap]: image.tags },
        },
      });
      res.json(similar);
    }
  } catch (error) {
    next(error);
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

    s3.upload(params, async (error, data) => {
      if (error) res.status(500).send(error);
      else {
        const tags = req.body.tags.split(',');
        const imageInfo = {
          fileLink: data.Location,
          title: req.body.title,
          tags: tags,
        };
        const newImage = await Image.create(imageInfo);
        res.status(200).send(newImage);
      }
    });
    res.status(200);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/images/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedImage = await Image.update(req.body, {
      returning: true,
      where: {
        id: req.params.id,
      },
    });
    const [numUpdated, [image]] = updatedImage;
    res.json(image);
  } catch (error) {
    next(error);
  }
});

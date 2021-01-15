const router = require('express').Router();
const { Image } = require('../db/models');
module.exports = router;

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

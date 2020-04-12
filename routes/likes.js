const express = require('express');
const { addLike, getAllLikes } = require('../controllers/likes');

const router = express.Router();

router.route('/').post(addLike).get(getAllLikes);

module.exports = router;

const express = require('express');
const jwt = require('../servises/jwt.servic');
const blog_controller = require('../controllers/blog');

const upload = require('../servises/file.servic');

const router = express.Router();
router.route('/blogs')
	.post(jwt().authenticateToken, upload.array('File', 10), blog_controller.create)
	.delete(jwt().authenticateToken, blog_controller.delete)
	.patch(jwt().authenticateToken, blog_controller.update);

module.exports = router;

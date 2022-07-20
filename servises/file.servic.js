const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
	destination(request, file, cb) {
		cb(null, 'storage/');
	},
	filename(request, file, cb) {
		cb(null, `${uuid.v4()}-${file.originalname}`);
	},
});

const file_Filter = (request, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({storage});

module.exports = upload;


const multer = require('multer');
const storage = multer.diskStorage({destination: "images/", filename: makeFilename});

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

function makeFilename(req, file, cb){
    const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, Date.now() + name  + '.' + extension);
}

module.exports = multer({storage}).single('url');
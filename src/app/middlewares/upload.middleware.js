const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({storage});

class Upload {
    single(fileName) {
        return upload.single(fileName);
    };
    multiple(fileName, length) {
        return upload.array(fileName, length);
    };
    byFields(objectArray) {
        return upload.fields(objectArray);
    };
}

module.exports = new Upload();

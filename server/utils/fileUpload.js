const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const filename = crypto.randomBytes(16).toString('hex') + ext
    cb(null, filename)
  }
})

const upload = multer({ storage })

module.exports = upload

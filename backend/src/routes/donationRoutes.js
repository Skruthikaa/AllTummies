const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../utils/multer');

const {
  createDonation,
  getAllDonations
} = require('../controllers/donationController');

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createDonation
);

router.get(
  '/',
  getAllDonations
);

module.exports = router;

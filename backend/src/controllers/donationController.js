const prisma = require('../config/db');

exports.createDonation = async (req, res) => {

  try {

    const {
      foodType,
      quantity,
      expiryTime,
      pickupAddress
    } = req.body;

    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.path;
    }

    const donation = await prisma.donation.create({

      data: {

        foodType,
        quantity,
        expiryTime: new Date(expiryTime),
        pickupAddress,
        imageUrl,
        donorId: req.user.id

      }

    });

    res.status(201).json({

      message: 'Donation created successfully',
      donation

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getAllDonations = async (req, res) => {

  try {

    const donations = await prisma.donation.findMany({

      include: {
        donor: true
      }

    });

    res.status(200).json(donations);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

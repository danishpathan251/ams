const express = require('express');
const router = express.Router();
const Business = require('../models/Business'); // Adjust the path

// ✅ 1. Get All Businesses
router.get('/businesses', async (req, res) => {
  try {
    const businesses = await Business.findAll();
    res.status(200).json(businesses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch businesses', error: err.message });
  }
});

// ✅ 2. Get Business by ID
router.get('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch business', error: err.message });
  }
});

// ✅ 3. Create New Business
router.post('/businesses', async (req, res) => {
  try {
    const business = await Business.create(req.body);
    res.status(201).json({ message: 'Business created successfully', business });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Business ID must be unique', error: err.message });
    }
    res.status(500).json({ message: 'Failed to create business', error: err.message });
  }
});

// ✅ 4. Update Business
router.put('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Business.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Business not found or not updated' });
    }

    const updatedBusiness = await Business.findByPk(id);
    res.status(200).json({ message: 'Business updated successfully', business: updatedBusiness });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update business', error: err.message });
  }
});

// ✅ 5. Delete Business
router.delete('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Business.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete business', error: err.message });
  }
});

// ✅ 6. Get Business by Business ID
router.get('/businesses/businessId/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findOne({ where: { businessId } });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch business', error: err.message });
  }
});

module.exports = router;

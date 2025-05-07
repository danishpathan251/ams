const express = require('express');
const router = express.Router();
const Store = require('../models/Store'); // Adjust the path

// ✅ 1. Get All Stores
router.get('/stores', async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores', error: err.message });
  }
});

// ✅ 2. Get Store by ID
router.get('/stores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch store', error: err.message });
  }
});

// ✅ 3. Create New Store
router.post('/stores', async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({ message: 'Store created successfully', store });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Store ID must be unique', error: err.message });
    }
    res.status(500).json({ message: 'Failed to create store', error: err.message });
  }
});

// ✅ 4. Update Store
router.put('/stores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Store.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Store not found or not updated' });
    }

    const updatedStore = await Store.findByPk(id);
    res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update store', error: err.message });
  }
});

// ✅ 5. Delete Store
router.delete('/stores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Store.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete store', error: err.message });
  }
});

// ✅ 6. Get Stores by Business ID
router.get('/stores/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const stores = await Store.findAll({ where: { businessId } });

    if (stores.length === 0) {
      return res.status(404).json({ message: 'No stores found for this business ID' });
    }

    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores for business ID', error: err.message });
  }
});

module.exports = router;

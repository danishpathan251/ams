const express = require('express');
const router = express.Router();
const Store = require('../models/Store'); // Adjust the path
const User = require('../models/User')
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
    console.log(err);
    console.log(err.message);
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

router.put('/store-geometry-update', async (req, res) => {
  try {
    const { id, geometry } = req.body;

    const [updated] = await Store.update(
      { geometry: geometry },
      { where: { storeid: id } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Store not found or not updated' });
    }

    const updatedStore = await Store.findOne({ where: { storeid: id } });

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
    const stores = await Store.findAll({ where: { businessid:businessId } });

    if (stores.length === 0) {
      return res.status(404).json({ message: 'No stores found for this business ID' });
    }

    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores for business ID', error: err.message });
  }
});

router.get('/store-details/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const stores = await Store.findAll({ where: { businessid:businessId } });

    if (stores.length === 0) {
      return res.status(404).json({ message: 'No stores found for this business ID' });
    }

    const newStore = stores.map(item => {
      return {
        id:item.storeid,
        name:item.storename,
        location:item.areaname,
        status:'open',
        rating:4.5

      }
    })
    res.status(200).json(newStore);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stores for business ID', error: err.message });
  }
});


router.get("/find-store/:id", async (req, res) => {
  try {
    const storeId = req.params.id;

    const list = await Store.findOne({where:{storeid:storeId}});
    if (!list) {
      return res.status(404).json({ status: 'error', message: 'Store not found' });
    }

    const users = await User.findAll({ where: { storeId } });
    const findManager = users.filter(user => user.role === 'manager');
    const findEmployee = users.filter(user => user.role === 'employee');

    const data = {
      storeId: list.id || 'null',
      storeName: list.storename || 'Downtown Electronics Store',
      address: list.address || '123 Main Street, Downtown, City - 12345',
      phoneNumber: list.phone || '+1 (555) 123-4567',
      email: list.email || 'downtown@electrostore.com',
      establishedYear: list.establishyear || 'Unknown',
      totalEmployees: findEmployee.length || 0,
      storeManager: findManager[0]?.fullname || 'Not Assigned',
      operatingHours: list.workingtime || '9AM - 6PM',
      storeRating: '-',           // Placeholder
      monthlyRevenue: '-'        // Placeholder
    };

    res.send({ status: 'success', message: 'Data Fetched Successfully', data, storeUser:users });

  } catch (e) {
    console.error('Error While Fetching Data', e);
    res.status(500).json({ status: 'error', message: e.message || 'Internal server error' });
  }
});

module.exports = router;

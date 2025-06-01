const express = require('express');
const router = express.Router();
const AttendanceLog = require('../models/AttendanceLog'); // Adjust the path

// ✅ 1. Get All Logs
router.get('/attendance-logs', async (req, res) => {
  try {
    const logs = await AttendanceLog.findAll();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
});

// ✅ 2. Get Logs by Date
router.get('/attendance-logs/date/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const logs = await AttendanceLog.findAll({ where: { date } });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs for the date', error: err.message });
  }
});

// POST /attendance-logs/range
router.post('/attendance-logs/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // ✅ Basic Validation
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (start > end) {
      return res.status(400).json({ message: 'startDate must be before endDate' });
    }

    // ✅ Query the database
    const logs = await AttendanceLog.findAll({
      where: {
        date: {
          [Op.between]: [start, end],
        },
      },
    });

    res.status(200).json({message:'Successfully Fetched!',data:logs});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
});


// ✅ 3. Get Log by ID
router.get('/attendance-logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const log = await AttendanceLog.findByPk(id);
    if (!log) return res.status(404).json({ message: 'Log not found' });

    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch log', error: err.message });
  }
});

// ✅ 4. Create New Log
router.post('/attendance-logs', async (req, res) => {
  try {
    const log = await AttendanceLog.create(req.body);
    res.status(201).json({ message: 'Log created successfully', log });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create log', error: err.message });
  }
});

// ✅ 5. Update Log
router.put('/attendance-logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await AttendanceLog.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: 'Log not found or not updated' });
    }

    const updatedLog = await AttendanceLog.findByPk(id);
    res.status(200).json({ message: 'Log updated successfully', log: updatedLog });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update log', error: err.message });
  }
});

// ✅ 6. Delete Log
router.delete('/attendance-logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AttendanceLog.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Log not found' });
    }

    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete log', error: err.message });
  }
});


// ✅ Get Logs by Employee ID and Date
router.get('/attendance-logs/employee/:employee_id/date/:date', async (req, res) => {
  try {
    const { employee_id, date } = req.params;
    
    const logs = await AttendanceLog.findAll({
      where: {
        employee_id,
        date,
      },
    });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for this employee on the specified date' });
    }

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
});

module.exports = router;


module.exports = router;

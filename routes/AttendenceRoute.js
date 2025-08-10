const express = require('express');
const router = express.Router();
const AttendanceLog = require('../models/AttendanceLog'); // Adjust the path

// ✅ 1. Get All Logs
router.get('/attendance-logs/:empId', async (req, res) => {
  const {empId} = req.params;
  try {
    const logs = await AttendanceLog.findAll({where:{
      employee_id:empId
    }});
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

router.post('/create-attendance-log', async (req, res) => {
  const { type, time, empId } = req.body;

  try {
    const timestamp = new Date(); // current date-time
    const dateOnly = timestamp.toISOString().split('T')[0]; // extract date

    const newLog = {
      employeeId: empId,           // make sure your model uses camelCase
      logType: type,               // same here
      timestamp: timestamp,
      date: dateOnly,
      time: time,
      remarks: '',
    };

    const log = await AttendanceLog.create(newLog);

    res.status(201).json({
      success: true,
      message: 'Log created successfully',
      data: log,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create log',
      error: err.message,
    });
  }
});


router.get('/api/emp-data/:empId', async (req, res) => {
  try {
    const empId = req.params.empId;

    // Fetch employee data
    const empList = await User.findOne({ where: { id: empId } });

    if (!empList) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Calculate date range: from 5 days ago to today
    const toDate = moment().endOf('day').toDate();      // Today 23:59:59
    const fromDate = moment().subtract(5, 'days').startOf('day').toDate(); // 5 days ago 00:00:00

    // Get attendance logs for last 5 days
    const AttendanceList = await AttendanceLog.findAll({
      where: {
        empId: empId,
        date: {
          [Op.between]: [fromDate, toDate]
        }
      },
      order: [['date', 'DESC'], ['createdAt', 'ASC']]
    });

    // Filter today's logs
    const todayDateStr = moment().format('YYYY-MM-DD');
    const todayLogs = AttendanceList.filter(log => {
      const logDateStr = moment(log.date).format('YYYY-MM-DD');
      return logDateStr === todayDateStr;
    });

    // Extract PunchIn and PunchOut times
    const punchIn = todayLogs.length > 0 ? todayLogs[0].time : null;
    const punchOut = todayLogs.length > 1 ? todayLogs[todayLogs.length - 1].time : null;

    // Optional: calculate total hours between punchIn and punchOut
    let totalHours = null;
    if (punchIn && punchOut) {
      const inTime = moment(punchIn, 'HH:mm');
      const outTime = moment(punchOut, 'HH:mm');
      totalHours = moment.duration(outTime.diff(inTime)).asHours().toFixed(2);
    }

    // Sample recent attendance from last 5-day logs
    const recentAttendances = AttendanceList.map(log => ({
      date: moment(log.date).format('YYYY-MM-DD'),
      status: 'Present', // You can adjust this logic based on your schema
      punchIn: log.time, // Replace with actual punchIn field if needed
      punchOut: '-',     // Replace if you track punchOut
    }));

    // Compose response
    const responseData = {
      personal_information: {
        mobile: empList.mobile,
        email: empList.email,
        joinDate: empList.joinDate,
      },
      TodayStatus: {
        PunchIn: punchIn,
        PunchOut: punchOut,
        totalHour: totalHours,
      },
      monthlysummary: {
        presentDays: 5,  // You should calculate this
        absentDays: 10,
        lateDays: 15,
        OverTime: 5, // Example data
      },
      leaveInformation: {
        totalLeave: 10,
        remaining: 4,
        pending: 10,
        used: 6,
      },
      recentAttendance: recentAttendances
    };

    res.status(200).json(responseData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Event = require('../models/Event'); // Adjust path accordingly

// Helper: standard response
const sendResponse = (res, success, message, data = null, statusCode = 200) => {
  return res.status(statusCode).json({ success, message, data });
};

// CREATE new event
router.post('/', async (req, res) => {
  try {
    const { title, date, description, type, organizationList } = req.body;

    // Basic validation
    if (!title || !date || !type) {
      return sendResponse(res, false, "Title, date and type are required", null, 400);
    }

    // Create event
    const event = await Event.create({ title, date, description, type, organizationList });
    return sendResponse(res, true, "Event created successfully", event, 201);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Failed to create event", null, 500);
  }
});

// READ all events, with optional filtering by type or organization
router.get('/', async (req, res) => {
  try {
    const { type, organization } = req.query;

    // Build where clause
    const whereClause = {};
    if (type) whereClause.type = type;
    if (organization) {
      whereClause.organizationList = { [Op.contains]: [organization] };
    }

    const events = await Event.findAll({ where: whereClause });
    return sendResponse(res, true, "Events fetched successfully", events);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Failed to fetch events", null, 500);
  }
});

// READ one event by id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return sendResponse(res, false, "Event not found", null, 404);

    return sendResponse(res, true, "Event fetched successfully", event);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Failed to fetch event", null, 500);
  }
});

// UPDATE event by id
router.put('/:id', async (req, res) => {
  try {
    const { title, date, description, type, organizationList } = req.body;
    const event = await Event.findByPk(req.params.id);

    if (!event) return sendResponse(res, false, "Event not found", null, 404);

    // Update fields if present
    if (title !== undefined) event.title = title;
    if (date !== undefined) event.date = date;
    if (description !== undefined) event.description = description;
    if (type !== undefined) event.type = type;
    if (organizationList !== undefined) event.organizationList = organizationList;

    await event.save();
    return sendResponse(res, true, "Event updated successfully", event);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Failed to update event", null, 500);
  }
});

// DELETE event by id
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return sendResponse(res, false, "Event not found", null, 404);

    await event.destroy();
    return sendResponse(res, true, "Event deleted successfully", null);
  } catch (error) {
    console.error(error);
    return sendResponse(res, false, "Failed to delete event", null, 500);
  }
});

module.exports = router;

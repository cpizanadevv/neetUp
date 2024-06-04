// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js');
const eventsRouter = require('./events.js');
const groupImagesRouter = require('./group-images.js');
const eventImagesRouter = require('./event-images.js');
const { restoreUser } = require("../../utils/auth.js");
const { formatDatesInObject } = require('../../utils/dateFormat.js');

// Connect restoreUser middleware to the API router
router.use(restoreUser);

function formatResponse(req, res, next) {
  const originalJson = res.json;

  res.json = function (data) {
    if (Array.isArray(data)) {
      data.forEach(item => formatDatesInObject(item));
    } else if (typeof data === 'object' && data !== null) {
      formatDatesInObject(data);
    }

    return originalJson.call(this, data);
  };

  next();
}

router.use(formatResponse);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/venues', venuesRouter);
router.use('/events', eventsRouter);
router.use('/group-images', groupImagesRouter);
router.use('/event-images', eventImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// All urls of the route api router will be prefixed with /api
router.use('/api', apiRouter);

// Allows dev to re set CSRF token cookie XSRF-TOKEN
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});



module.exports = router;
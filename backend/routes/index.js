const express = require('express');
const router = express.Router();
const apiRouter = require('./api')

// All urls of the route api router will be prefixed with /api
router.use('/api', apiRouter);

// Allows dev to re set CSRF token cookie XSRF-TOKEN
router.get('/api/csrf/restore', function(req, res){
    const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.post('/test', function(req,res) {
  red.json({ requestBody: req.body });
});


module.exports = router;
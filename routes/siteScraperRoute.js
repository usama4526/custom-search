
const express = require('express')
const siteScraperController = require('../controllers/siteScraperController')
router = express.Router()

router.route('/').post(siteScraperController.getSiteVideoSrc) 

module.exports = router
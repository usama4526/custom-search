
const express = require('express')
const siteController = require('../controllers/siteController')
router = express.Router()

router.route('/').get(siteController.getAllSites).post(siteController.createSite) 
router.route('/:id').delete(siteController.deleteSite)

module.exports = router
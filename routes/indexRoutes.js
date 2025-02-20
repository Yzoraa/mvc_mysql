const express = require('express');
const router = express.Router();
const visitorController = require('../controller/visitorController');

router.get('/', visitorController.getvisitor);
router.get('/detail/:id', visitorController.getvisitorOne);
router.get('/write/:id', visitorController.moveWrite);

// router.post('/post/test', visitorController.createTest);
router.post('/post/real', visitorController.createReal);

router.delete('/delete/:id', visitorController.deleteData);

router.put('/update', visitorController.dataUpdate);

module.exports = router;
const express = require('express'); 

const router = express.Router();
const chatController = require('../controllers/chats_controller');

router.post('/create', chatController.create);


module.exports = router;
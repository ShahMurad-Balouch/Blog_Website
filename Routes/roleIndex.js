const express = require('express');
const app = express();
app.use(express.json())

const router = express.Router();
const {createRole , getuserRole} = require('../Controllers/roleController');

router.post('/createrole' , createRole);
router.get('/:id/getrole' , getuserRole)

module.exports = router;
const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');

const attributeController = require('../controllers/attributeController');
const validationtoken = require('../middelware/tokenAuthenticate');
const validate = require('../middelware/validate');
const { attributeSchema, updateAttributeSchema } = require('../middelware/Schemas/attributeSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage }).single('image');

routes.post('/addattribute', upload, validate(attributeSchema), validationtoken, attributeController.AddAttribute);

//get route
routes.get('/getattribute', validationtoken, attributeController.GetAttribute);

//getbyid Route
routes.get('/getbyidattribute/:id', validationtoken, attributeController.GetByIdAttribute);

//update Route    
routes.put('/updateattribute/:id', upload, validate(updateAttributeSchema), validationtoken, attributeController.UpdateAttribute);

//Delete Route
routes.delete('/deleteattribute/:id', validationtoken, attributeController.DeleteAttribute);

module.exports = routes;

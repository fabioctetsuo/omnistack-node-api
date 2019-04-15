const express = require('express');
const multer = require('multer');
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const multerConfig = require('./config/multer');

const routes = express.Router();

routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes', BoxController.store);

routes.post('/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store);

module.exports = routes;
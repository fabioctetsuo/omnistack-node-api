const mongoose = require('mongoose');
/*
  Para criar relacionamentos no mongo, nós usamos referenciamos
  as chaves dos objetos dentro de onde precisamos,
  no caso estamos referenciando os id's do model File dentro do model Box
*/
const Box = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Box', Box);
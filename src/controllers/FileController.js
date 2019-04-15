const File = require('../models/File');
const Box = require('../models/Box');

class FileController { 
  async store(req, resp) {
    //Criar arquivo
    const { id } = req.params;
    const box = await Box.findById(id);
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });
    box.files.push(file);
    await box.save();
    req.io.sockets.in(id).emit('file', file);
    return resp.json(file);
  }
}

module.exports = new FileController();
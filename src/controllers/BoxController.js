const Box = require('../models/Box');

class BoxController { 
  async store(req, resp) {
    const { title } = req.body;
    const box = await Box.create({ title });
    return resp.json(box);
  }

  async show(req, resp) {
    const { id } = req.params;
    const box = await Box.findById(id).populate({
      path: 'files',
      options: {
        sort: { createdAt: -1 }
      }
    });
    return resp.json(box);
  }
}

module.exports = new BoxController();
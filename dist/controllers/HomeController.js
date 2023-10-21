"use strict";Object.defineProperty(exports, "__esModule", {value: true});

class HomeController {
  index(req, res) {
    res.json({
      API_NAME: 'Orquindias API',
      ALLOWED_ROUTES: {
        clothes: ['findOne', 'findAll']
      }
    })
  }
}

exports. default = new HomeController();

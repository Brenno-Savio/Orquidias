import { Request, Response } from 'express';

class HomeController {
  index(req: Request, res: Response): void {
    res.json({
      API_NAME: 'Orquindias API',
      ALLOWED_ROUTES: {
        clothes: ['findOne', 'findAll']
      }
    })
  }
}

export default new HomeController();

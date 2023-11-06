import { Router } from 'express';

import pictureController from '../controllers/PicturesController';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, pictureController.store);
router.delete('/:id', loginRequired, pictureController.delete);

export default router;

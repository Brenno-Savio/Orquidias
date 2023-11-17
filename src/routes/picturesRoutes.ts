import { Router } from 'express';

import picturesController from '../controllers/PicturesController';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, picturesController.store);
router.delete('/:id', loginRequired, picturesController.delete);

export default router;

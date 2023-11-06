import { Router } from 'express';
import clothesController from '../controllers/ClothesController';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, adminRequired, clothesController.store);
router.get('/', loginRequired, adminRequired, clothesController.index);
router.get('/:id', loginRequired, adminRequired, clothesController.show);
router.put('/:id', loginRequired, adminRequired, clothesController.update);
router.delete('/:id', loginRequired, adminRequired, clothesController.delete);

export default router;

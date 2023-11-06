import { Router } from 'express';
import categoriesController from '../controllers/CategoriesController';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, adminRequired, categoriesController.store);
router.get('/', loginRequired, adminRequired, categoriesController.index);
router.get('/:id', loginRequired, adminRequired, categoriesController.show);
router.put('/:id', loginRequired, adminRequired, categoriesController.update);
router.delete('/:id', loginRequired, adminRequired, categoriesController.delete);

export default router;

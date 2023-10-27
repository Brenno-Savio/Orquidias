import { Router } from 'express';
import categoriesController from '../controllers/CategoriesController';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', categoriesController.store);
router.get('/', loginRequired, categoriesController.index);
router.get('/:id', loginRequired, categoriesController.show);
router.put('/:id', loginRequired, categoriesController.update);
router.delete('/:id', loginRequired, categoriesController.delete);

export default router;

import { Router } from 'express';
import categoriesController from '../controllers/CategoriesController';

const router: Router = Router();

router.post('/', categoriesController.store);
router.get('/',  categoriesController.index);
router.get('/:id', categoriesController.show);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;

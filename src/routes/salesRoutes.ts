import { Router } from 'express';
import salesController from '../controllers/SalesController';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', loginRequired, salesController.store);
router.get('/', loginRequired, adminRequired, salesController.index);
router.get('/:id', loginRequired, adminRequired, salesController.show);
router.put('/:id', loginRequired, adminRequired, salesController.update);
router.delete('/:id', loginRequired, adminRequired, salesController.delete);

export default router;

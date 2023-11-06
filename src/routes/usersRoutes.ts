import { Router } from 'express';
import usersController from '../controllers/UsersController';
import adminRequired from '../middlewares/adminRequired';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', usersController.store);
router.get('/', loginRequired, adminRequired, usersController.index);
router.get('/:id', loginRequired, adminRequired, usersController.show);
router.put('/:id', loginRequired, usersController.update);
router.delete('/:id', loginRequired, adminRequired, usersController.delete);

export default router;

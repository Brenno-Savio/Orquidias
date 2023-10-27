import { Router } from 'express';
import usersController from '../controllers/UsersController';
import loginRequired from '../middlewares/loginRequired';

const router: Router = Router();

router.post('/', usersController.store);
router.get('/', loginRequired, usersController.index);
router.get('/:id', loginRequired, usersController.show);
router.put('/:id', loginRequired, usersController.update);
router.delete('/:id', loginRequired, usersController.delete);

export default router;

import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router: Router = Router();

router.post('/', tokenController.store);

export default router;

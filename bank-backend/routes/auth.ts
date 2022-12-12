import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.post('/', authController.login)
router.post('/verify', authController.verifyAuth)

export default router;
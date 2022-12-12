import { Router } from 'express';
import { seedController } from '../controllers';

const router = Router();

router.get('/', seedController.save)

export default router;
import { Router } from 'express';
import { categoriesController } from '../controllers/'

const router = Router();

router.get('/', categoriesController.get);



export default router;
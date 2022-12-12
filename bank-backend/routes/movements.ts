import { Router } from 'express';
import { movementController } from '../controllers'
import { fieldsValidate, validateJWT } from '../middlewares';

const router = Router();

router.post('/', [
    validateJWT,
    fieldsValidate
],movementController.save);

router.post('/:accountNumber', [
    validateJWT,
    fieldsValidate
],movementController.saveByAccount);

router.get('/', [
    validateJWT,
    fieldsValidate
],movementController.getHistoryMovements);

export default router;
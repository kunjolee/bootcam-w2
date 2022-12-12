import { Router } from "express";
import { currencyController } from "../controllers";
import { fieldsValidate, validateJWT } from "../middlewares";

const router = Router();


router.get('/', [
    validateJWT,
    fieldsValidate
],currencyController.get);


export default router;
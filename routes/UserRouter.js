import express from 'express';
import { signup,getAllusers,Login} from '../controller/UseController.js';

var router=express.Router();

router.post ("/signup",signup);
router.get("/fetch", getAllusers)
router.post("/login", Login)

  

export default router;
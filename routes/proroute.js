import  express  from "express";
import { getproduct,
         getproductbyid,
         createproduct,
         updateproduct,
         deleteproduct
} from "../controllers/products.js";

import { verifyuser } from "../middleware/authuser.js";

const router = express.Router()

router.get('/product',verifyuser, getproduct)
router.get('/product/:id',verifyuser, getproductbyid)
router.post('/product',verifyuser, createproduct)
router.patch('/product/:id',verifyuser, updateproduct)
router.delete('/product/:id',verifyuser, deleteproduct)

export default router
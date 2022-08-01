import  express  from "express";
import { login,logout,Me } from "../controllers/auth.js";

const router = express.Router()

router.get('/Me', Me)
router.post('/login', login)
router.delete('/logout', logout)

export default router
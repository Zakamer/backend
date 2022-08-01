import  express  from "express";
import { getuser,
         getuserbyid,
         createuser,
         updateuser,
         deleteuser
} from "../controllers/users.js";
import { verifyuser,adminonly } from "../middleware/authuser.js";

const router = express.Router()

router.get('/users',verifyuser,adminonly, getuser)
router.get('/users/:id',verifyuser,adminonly, getuserbyid)
router.post('/users',verifyuser,adminonly, createuser)
router.patch('/users/:id',verifyuser,adminonly, updateuser)
router.delete('/users/:id',verifyuser,adminonly, deleteuser)

export default router
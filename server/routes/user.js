import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} from '../controllers/user.js'

// import authMiddleware from '../middlewares/auth.js';
import { protect, adminOnly } from '../middlewares/auth.js';

// Router /users
const router = express.Router();

// HTTP Verbs for RESTful APIs GET, POST, PUT, DELETE
router.get('/', protect, adminOnly, getAllUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.post('/', createUser);
router.put('/:id', protect, adminOnly, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);
router.post('/login', loginUser)

export default router;
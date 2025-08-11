
import { Router } from 'express';
import { login, register, verifyOtp, resendOtp, getProfile, updateProfile } from '../../controllers/UserController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

export default router;

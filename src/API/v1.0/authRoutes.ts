import { Router } from 'express';
import { AuthController } from '@controllers/authController';
import { signupValidation, loginValidation, otpValidation } from '../../middlewares/authValidation';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);
router.post('/verify-otp', otpValidation, authController.verifyOtp);

// Example of a protected route:
// router.get('/me', authMiddleware, authController.getProfile);

export default router;

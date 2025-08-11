import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

// Health check for this API version
router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'API v1.0 is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Route modules
router.use('/auth', authRoutes);

export default router;

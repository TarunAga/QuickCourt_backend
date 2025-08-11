import { Router } from 'express';
import fileRoutes from './fileRoutes';
// Import other route modules as they are created

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
router.use('/files', fileRoutes);
// Add other routes here as they are created
// router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;

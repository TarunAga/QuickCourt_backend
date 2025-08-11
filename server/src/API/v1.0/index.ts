
import { Router } from 'express';

import facilityRoutes from './facility.routes';
import bookingRoutes from './booking.routes';
import reviewRoutes from './review.routes';

const router = Router();

// Health check for this API version
router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'API v1.0 is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});



router.use('/facilities', facilityRoutes);
router.use('/bookings', bookingRoutes);
router.use('/', reviewRoutes);

export default router;

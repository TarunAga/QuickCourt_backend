import { Router } from 'express';
import { BookingController } from '../../controllers/BookingController';

const router = Router();

router.get('/', BookingController.list);
router.get('/:id', BookingController.get);
router.post('/', BookingController.create);
router.patch('/:id/cancel', BookingController.cancel);

export default router;

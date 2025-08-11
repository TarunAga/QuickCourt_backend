import { Router } from 'express';
import { FacilityController } from '../../controllers/FacilityController';

const router = Router();

router.get('/', FacilityController.list);
router.get('/:id', FacilityController.get);
router.post('/', FacilityController.create);
router.put('/:id', FacilityController.update);
router.delete('/:id', FacilityController.delete);

export default router;

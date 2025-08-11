import { Router } from "express";
import { ReviewController } from "../../controllers/ReviewController";

const router = Router();

router.get("/facilities/:facilityId/reviews", ReviewController.list);
router.post("/facilities/:facilityId/reviews", ReviewController.create);

export default router;

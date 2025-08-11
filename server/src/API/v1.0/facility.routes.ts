import { Router } from "express";
import { FacilityController } from "../../controllers/FacilityController";

const router = Router();


router.get("/", FacilityController.list);
router.get("/:id", FacilityController.get);
router.post("/", FacilityController.create);
router.put("/:id", FacilityController.update);
router.delete("/:id", FacilityController.delete);

// Book a sport for a facility
router.post("/:facilityId/bookings", FacilityController.bookSport);

export default router;

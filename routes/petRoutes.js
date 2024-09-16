import { Router } from "express";
import {
  createPet,
  getPetById,
  getPets,
} from "../controllers/petController.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

// Route to create a new pet (image upload with multer)
router.post("/create", upload.single("image"), createPet);

// Route to get all pets
router.get("/", getPets);
router.get("/:id", getPetById);

export default router;

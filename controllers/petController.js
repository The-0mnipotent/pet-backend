import Pet from "../models/Pet.js";
import { uploadOnCloudinary } from "../services/cloudinary.services.js";

// Controller to create a new pet
const createPet = async (req, res) => {
  const {
    petName,
    gender,
    age,
    color,
    breed,
    sterilizationCard,
    vaccinationCard,
  } = req.body;

  let imageUrl = "";

  // Check if file exists and process the upload
  if (req.file) {
    console.log("Uploading image:", req.file);
    try {
      const uploadResult = await uploadOnCloudinary(req.file.path); // Upload the image to Cloudinary
      console.log("Upload result:", uploadResult);
      imageUrl = uploadResult.secure_url; // Store the secure_url returned from Cloudinary
    } catch (error) {
      console.error("Error uploading image:", error);
      return res
        .status(500)
        .json({
          message: "Error uploading image to Cloudinary.",
          variables: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          },
        });
    }
  }

  try {
    const newPet = new Pet({
      petName,
      gender,
      age,
      color,
      breed,
      sterilizationCard,
      vaccinationCard,
      imageUrl, // Store the image URL from Cloudinary
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating pet", error: error.message });
  }
};

// Controller to get all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pets", error: error.message });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet", error });
  }
};

export { createPet, getPetById, getPets };

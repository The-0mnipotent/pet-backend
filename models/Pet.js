import { Schema, model } from "mongoose";

const petSchema = new Schema({
  petName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  sterilizationCard: {
    type: String,
    enum: ["Yes", "No", "Don't Know"],
    required: true,
  },
  vaccinationCard: {
    type: String,
    enum: ["Yes", "No", "Don't Know"],
    required: true,
  },
  imageUrl: {
    type: [String], // Array of image URLs (strings) by default
    default: [],
  },
});

const Pet = model("Pet", petSchema);
export default Pet;

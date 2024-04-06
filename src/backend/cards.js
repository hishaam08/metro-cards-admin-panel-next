import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  religionType: {
    type: String,
    required: true,
    enum: {
      values: ["Hindu", "Muslim", "Christian", "Interfaith"],
      message: "Please select correct category.",
    },
  },
  cardType: {
    type: String,
    required: true,
    enum: {
      values: ["Premium", "SuperPremium", "Normal", "Low"],
      message: "Please select correct category.",
    },
  },
  occasion: {
    type: String,
    required: true,
    enum: {
      values: [
        "Engagement",
        "Wedding",
        "Reception",
        "HouseWarming",
        "EarBoring",
        "Birthday",
        "Upananayam",
        "Shastiaboorthi",
        "Inaugaration",
        "Anniversary",
      ],
      message: "Please select correct ocassion.",
    },
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: [
        "Single",
        "Folding",
        "ThreeFolding",
        "BoxScroll",
        "HardCover",
        "Scroll",
      ],
      message: "Please select correct type.",
    },
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.models.Cards || mongoose.model("Cards", cardSchema);

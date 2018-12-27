const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true },
);

RecipeSchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Recipe', RecipeSchema);

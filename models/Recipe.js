const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema(
  {
    name: {
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
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

RecipeSchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Recipe', RecipeSchema);

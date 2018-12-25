const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('./config');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({
        updatedAt: 'desc',
      });
      return allRecipes;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        ).sort({
          score: { $meta: 'textScore' },
        });
        return searchResults;
      }
      const recipes = await Recipe.find().sort({
        likes: 'desc',
        updatedAt: 'desc',
      });
      return recipes;
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username }).populate({
        path: 'favorites',
        model: 'Recipe',
      });
      return user;
    },
    getUserRecipes: async (root, { username }, { Recipe }) => {
      const userRecipes = await Recipe.find({ username }).sort({
        updatedAt: 'desc',
      });
      return userRecipes;
    },
  },
  Mutation: {
    addRecipe: async (
      root,
      {
        name, description, category, instructions, username,
      },
      { Recipe },
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username,
      }).save();
      return newRecipe;
    },
    deleteRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndDelete({
        _id,
      });
      return recipe;
    },
    loginUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, JWT_KEY, '1hr') };
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists ');
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, JWT_KEY, '1hr') };
    },
  },
};

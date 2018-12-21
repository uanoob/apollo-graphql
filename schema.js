exports.typeDefs = `
  type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    created_at: String
    updated_at: String
    likes: Int
    username: String
  }
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    created_at: String
    updated_at: String
    favorites: [Recipe]
  }
  type Query {
    getAllRecipes: [Recipe]
    getCurrentUser: User
  }
  type Token {
    token: String!
  }
  type Mutation {
    addRecipe(
      name: String!
      description: String!
      category: String!
      instructions: String!
      username: String
    ): Recipe
    loginUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;
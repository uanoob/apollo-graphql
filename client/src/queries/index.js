import { gql } from 'apollo-boost';

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
      updatedAt
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      createdAt
      likes
      username
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

/* Resipes Mutations */
export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      createdAt
      updatedAt
      likes
      username
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      createdAt
      favorites {
        _id
        name
      }
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
    }
  }
`;

/* User Mutations */
export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

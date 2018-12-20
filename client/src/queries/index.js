import { gql } from 'apollo-boost';

const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      category
      description
      instructions
      created_at
      updated_at
      likes
    }
  }
`;

export default GET_ALL_RECIPES;

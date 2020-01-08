import gql from "graphql-tag";

export const queryCharacters = gql`
  query Character(
    $page: Int = 1
    $species: String = ""
    $gender: String = ""
    $name: String = ""
  ) {
    characters(
      page: $page
      filter: { species: $species, gender: $gender, name: $name }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        gender
        image
      }
    }
  }
`;

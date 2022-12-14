import { gql } from "@apollo/client";

const ADD_MOTIVATIONALTIP = gql`
    mutation AddMotivationalTip($description: String!) {
        addMotivationalTip(description: $description) {
            _id
        }
    }
`

export { ADD_MOTIVATIONALTIP };
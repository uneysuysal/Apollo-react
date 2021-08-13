import { gql } from "@apollo/client";


export const LOAD_COMMENT = gql`
  query MyQuery {
  Jobs (order_by: {created_at: desc}){
    id
    name
    job
    age
    created_at
  }
}
`;


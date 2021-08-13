import { gql } from "@apollo/client";

export const CREATE_JOBS = gql`
mutation MyMutation ($age: String,$name: String,$job: String) {
    insert_Jobs(objects: {age:$age,name:$name,job:$job}) {
      affected_rows
      returning {
        age
        name
        job
        id
      }
    }
  }
`;
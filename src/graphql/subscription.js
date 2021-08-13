import {gql} from '@apollo/client'


export const GET_JOBS= gql`
subscription MySubscription {
    Jobs {
      age
      created_at
      id
      job
      name
    }
  }`;


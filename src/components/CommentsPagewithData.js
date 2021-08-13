import { LOAD_COMMENT } from "../graphql/queries";
import { GET_JOBS } from "../graphql/subscription";
import React from "react";
import { CommentsPage } from "./CommentsPage";
import { useQuery } from "@apollo/client";

function CommentsPageWithData({ params }) {
  const { subscribeToMore, ...result } = useQuery(LOAD_COMMENT, {
    variables: { created_at: params.created_at },
  });

  return (
    <CommentsPage
      {...result}
      subscribeToNewComments={() =>
        subscribeToMore({
          document: GET_JOBS,
          variables: { created_at:params.created_at },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newFeedItem = subscriptionData.data.Jobs;
            return Object.assign({}, prev, {
              post: {
                Jobs: [newFeedItem, ...prev.post.comments],
              },
            });
          },
        })
      }
    />
  );
}
export default CommentsPageWithData;

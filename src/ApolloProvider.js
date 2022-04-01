import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
    useQuery,
    gql
  } from "@apollo/client";
import React from 'react';

const client = new ApolloClient({
    uri: 'https://chat-app-apollo.herokuapp.com/',
    cache: new InMemoryCache()
});

export default function ApolloProvider(props) {
    return <Provider client={client} {...props} />
}
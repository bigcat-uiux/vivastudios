import {ApolloClient, InMemoryCache} from "@apollo/client";

const Client = new ApolloClient({
    cache: new InMemoryCache(),
     // uri: 'http://www.sandbox.wpviva.com:8080/graphql',
     uri: 'https://clubthreesix.com/jemson/external/vivastudios/graphql',
    defaultOptions: {
      query: {
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'ignore'
      }
    }
});

export default Client;
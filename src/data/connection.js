import {ApolloClient, InMemoryCache} from "@apollo/client";

const Client = new ApolloClient({
    cache: new InMemoryCache(),
<<<<<<< HEAD
     // uri: 'http://www.sandbox.wpviva.com:8080/graphql',
     uri: 'https://clubthreesix.com/jemson/external/vivastudios/graphql',
=======
    uri: 'http://www.sandbox.wpviva.com:8080/graphql',
    // uri: 'https://clubthreesix.com/jemson/external/vivastudios/graphql',
>>>>>>> b20396823abffbb8495db25507dc8f4f7840d206
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
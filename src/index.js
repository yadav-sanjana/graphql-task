import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";

//schema
const typeDefs = `
    type Query {
        greeting(name:String) : String!
         me : User!
         post : Post!
         add(numbers : [Int!]!) : Float!
         grades : [Int! ]!
    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int

    }

    type Post {
        id : ID!
        title : String!
        body : String!
        published : Boolean!
    }
      `;

//resolvers
const resolvers = {
  Query: {
    greeting(parent, args, info, ctx) {
      if (args.name) {
        return `Hello ! ${args.name}`;
      } else {
        return "Hello, there!";
      }
    },
    add(parent, args, info, ctx) {
      if (args.numbers.length === 0) {
        return 0;
      } else {
        return args.numbers.reduce((accumalator, currentValue) => {
          return accumalator + currentValue;
        });
      }
    },
    grades() {
      return [90, 21, 423];
    },
    me() {
      return {
        id: 23,
        name: "sanjana",
        email: "sanjana@gmail.com",
        age: 13,
      };
    },
    post() {
      return {
        id: 12,
        title: "new post",
        body: "new post data is fetched",
        published: true,
      };
    },
  },
};

const task = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

const server = createServer(task);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});

const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// define type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

//query all the users
const user = {
  type: UserType,
  args: { id: { name: "email", type: GraphQLString } },
  resolve: async (parent, args) => {
    const email = args.id;
    const user = await User.findOne({ email });
    return user;
  },
};

//query a list of patients
const patients = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args) => {
    const patients = await User.find({ role: "patient" });
    return patients;
  },
};

//query a single patien
const patient = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args) => {
    const patient = await User.findById(args.id);
    return patient;
  },
};
//query a list of nurse
const nurses = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args) => {
    const nurses = await User.find({ role: "nurse" });
    return nurses;
  },
};

//query a single nurse
const nurse = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args) => {
    const nurse = await User.findById(args.id);
    return nurse;
  },
};

const userQuery = {
  user,
  patients,
  patient,
  nurses,
  nurse,
};

module.exports = { userQuery, UserType };

const User = require("../models/user");
const MotivationalTip = require("../models/motivationalTip");
const EmergencyAlertType = require("../models/emergencyAlert");
const VitalSign = require("../models/vitalSign");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");

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

const MotivationalTipType = new GraphQLObjectType({
  name: "MotivationalTip",
  fields: () => ({
    description: { type: GraphQLString },
    nurse: { type: UserType },
  }),
});

const EmergencyAlertType = new GraphQLObjectType({
  name: "EmergencyAlert",
  fields: () => ({
    id: { type: GraphQLString },
    content: { type: GraphQLString },
    isAccepted: { type: GraphQLBoolean },
    patient: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id);
      },
    },
  }),
});

const VitalSignType = new GraphQLObjectType({
  name: "VitalSign",
  fields: () => ({
    id: { type: GraphQLString },
    bodyTem: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    bloodPre: { type: GraphQLFloat },
    respiratoryRate: { type: GraphQLFloat },
    patient: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return User(findById(args.id));
      }
    },
    motivationalTips: {
      type: new GraphQLList(UserType),
    }
  },
});

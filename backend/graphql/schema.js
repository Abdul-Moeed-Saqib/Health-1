const MotivationalTip = require("../models/motivationalTip");
const EmergencyAlert = require("../models/emergencyAlert");
const VitalSign = require("../models/vitalSign");
const { userQuery } = require('./userSchema')
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

const { UserType } = require('./userSchema')
// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     address: { type: GraphQLString },
//     city: { type: GraphQLString },
//     phoneNumber: { type: GraphQLString },
//     email: { type: GraphQLString },
//     role: { type: GraphQLString },
//   }),
// });

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
      resolve: async (parent, args) => {
        return await User.findById(parent.id);
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
      resolve: async (parent, args) => {
        return await User.findById(parent.id);
      },
    },
  }),
});



const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQuery,
    motiavtionalTip: {
      type: MotivationalTipType,
      resolve: async (parent, args) => {
        const rand = Math.floor(Math.random() * MotivationalTip.count())
        const motiavTip = await MotivationalTip.findOne().skip(rand);
        return motiavTip;
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMotiavtionalTip: {
      type: MotivationalTipType,
      args: {
        description: { type: GraphQLNonNull(GraphQLString) },
        nurseId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async function (parent, args) {
        try {
          const motiavtional = await MotivationalTip.create({ description: args.description, nurse: args.nurseId });
          return motiavtional;
        } catch (error) {
          throw Error(error.message);
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})

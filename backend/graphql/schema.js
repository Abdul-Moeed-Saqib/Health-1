const MotivationalTip = require("../models/motivationalTip");
const EmergencyAlert = require("../models/emergencyAlert");
const VitalSign = require("../models/vitalSign");
const { userQuery, userMutation, UserType } = require("./userSchema");
const { requireAuth } = require("../middleware/requireAuth");
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

const MotivationalTipType = new GraphQLObjectType({
  name: "MotivationalTip",
  fields: () => ({
    nurseId: { type: GraphQLString },
    description: { type: GraphQLString },
    nurse: {
      type: UserType,
      resolve: async (parent, args) => {
        return await MotivationalTip.findById(parent.id);
      },
    },
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
        const rand = Math.floor(Math.random() * MotivationalTip.count());
        const motiavTip = await MotivationalTip.findOne().skip(rand);
        return motiavTip;
      },
    },
    emerAlerts: {
      type: new GraphQLList(EmergencyAlertType),
      resolve: async (parent, args) => {
        return EmergencyAlert.find();
      },
    },
    emerAlert: {
      type: EmergencyAlertType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return EmergencyAlert(findById(args.id));
      },
    },
    vitalSigns: {
      type: new GraphQLList(VitalSignType),
      resolve: async (parent, args) => {
        return VitalSign.find();
      },
    },
    vitalSign: {
      type: VitalSignType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return VitalSign(findById(args.id));
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    requireAuth,
    ...userMutation,
    //MotiavtionalTip mutation
    addMotiavtionalTip: {
      type: MotivationalTipType,
      args: {
        description: { type: GraphQLNonNull(GraphQLString) },
        nurseId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async function (parent, args) {
        try {
          const motiavtional = await MotivationalTip.create({
            description: args.description,
            nurse: args.nurseId,
          });
          return motiavtional;
        } catch (error) {
          throw Error(error.message);
        }
      },
    },
    deleteMotiavtionalTip: {
      type: MotivationalTipType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return MotivationalTip.findByIdAndRemove(args.id);
      },
    },
    //EmergencyAlert mutation
    addEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        content: { type: GraphQLNonNull(GraphQLString) },
        patientId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async function (parent, args) {
        try {
          const emerAlert = await EmergencyAlert.create({
            constent: args.constent,
            parent: args.patientId,
          });
          return emerAlert;
        } catch (error) {
          throw Error(error.message);
        }
      },
    },
    deleteEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return EmergencyAlert.findByIdAndRemove(args.id);
      },
    },
    //VitalSign mutation
    addVitalSign: {
      type: VitalSignType,
      args: {
        bodyTem: { type: GraphQLNonNull(GraphQLFloat) },
        heartRate: { type: GraphQLNonNull(GraphQLFloat) },
        bloodPre: { type: GraphQLNonNull(GraphQLFloat) },
        respiratoryRate: { type: GraphQLNonNull(GraphQLFloat) },
        patientId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async function (parent, args) {
        try {
          const vitalSign = await VitalSign.create({
            bodyTem: args.bodyTem,
            heartRate: args.heartRate,
            bloodPre: args.bloodPre,
            respiratoryRate: args.respiratoryRate,
            patientId: args.parentId,
          });
          return vitalSign;
        } catch (error) {
          throw Error(error.message);
        }
      },
    },
    deleteVitalSign: {
      type: VitalSignType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(paretn, args) {
        return VitalSign.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

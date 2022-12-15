const MotivationalTip = require("../models/motivationalTip");
const EmergencyAlert = require("../models/emergencyAlert");
const User = require("../models/user");
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
    _id: { type: GraphQLString },
    nurseId: { type: GraphQLString },
    description: { type: GraphQLString },
    nurse: {
      type: UserType,
      resolve: async (parent, args) => {
        return await MotivationalTip.findById(parent.nurse);
      },
    },
  }),
});

const EmergencyAlertType = new GraphQLObjectType({
  name: "EmergencyAlert",
  fields: () => ({
    _id: { type: GraphQLString },
    id: { type: GraphQLString },
    content: { type: GraphQLString },
    isAccepted: { type: GraphQLBoolean },
    patient: {
      type: UserType,
      resolve: async (parent, args) => {
        return await User.findById(parent.patient);
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
    createdAt: { type: GraphQLString},
    patient: {
      type: UserType,
      resolve: async (parent, args) => {
        return await User.findById(parent.patient);
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
        const rand = Math.floor(Math.random() * await MotivationalTip.count());
        const motiavTip = await MotivationalTip.findOne().skip(rand);
        return motiavTip;
      },
    },
    emerAlerts: {
      type: new GraphQLList(EmergencyAlertType),
      resolve: async (parent, args, context) => {
        await requireAuth(context)
        return EmergencyAlert.find();
      },
    },
    findEmerAlert: {
      type: EmergencyAlertType,
      resolve: async (parent, args, context) => {
        const user = await requireAuth(context);
        return EmergencyAlert.findOne({ patient: user._id });
      }
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
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return VitalSign.find({ patient: args.id});
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
    ...userMutation,
    //MotiavtionalTip mutation
    addMotivationalTip: {
      type: MotivationalTipType,
      args: {
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async function (parent, args, context) {
        try {
          const user = await requireAuth(context);
          const motiavtional = await MotivationalTip.create({
            description: args.description,
            nurse: user._id,
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
      },
      resolve: async function (parent, args, context) {
        try {
          const user = await requireAuth(context);
          const exists = await EmergencyAlert.findOne({ patient: user._id });
          if (exists) {
            throw Error('You already send an emergency. Please wait.');
          }
          const emerAlert = await EmergencyAlert.create({
            content: args.content,
            patient: user._id,
          });
          return emerAlert;
        } catch (error) {
          throw Error(error.message);
        }
      },
    },
    updateEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        isAccepted: { type: GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: async function (parent, args, context) {
        await requireAuth(context);
        return EmergencyAlert.findByIdAndUpdate(args.id, {
          isAccepted: args.isAccepted
        }, { new: true });
      }
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
      resolve: async function (parent, args, context) {
        //  await requireAuth(context);
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
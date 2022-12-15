const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const { requireAuth } = require("../middleware/requireAuth");
const { UserType } = require("./userSchema");

const EmergencyAlert = require("../models/emergencyAlert");
const User = require("../models/user");

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

// Query

const emerAlerts = {
    type: new GraphQLList(EmergencyAlertType),
    resolve: async (parent, args, context) => {
      await requireAuth(context)
      return EmergencyAlert.find();
    },
  };

const findEmerAlert = {
    type: EmergencyAlertType,
    resolve: async (parent, args, context) => {
      const user = await requireAuth(context);
      return EmergencyAlert.findOne({ patient: user._id });
    }
  };

const emerAlert = {
    type: EmergencyAlertType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
      return EmergencyAlert(findById(args.id));
    },
  };

// Mutations

const addEmergencyAlert = {
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
  };

const updateEmergencyAlert = {
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
  };


const deleteEmergencyAlert = {
    type: EmergencyAlertType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function(parent, args, context) {
      await requireAuth(context);
      return EmergencyAlert.findByIdAndRemove(args.id);
    },
  };

const emergencyAlertQuery = {
    emerAlerts,
    findEmerAlert,
    emerAlert
};

const emergencyAlertMutation = {
    addEmergencyAlert,
    updateEmergencyAlert,
    deleteEmergencyAlert
};

module.exports = {EmergencyAlertType, emergencyAlertQuery, emergencyAlertMutation};
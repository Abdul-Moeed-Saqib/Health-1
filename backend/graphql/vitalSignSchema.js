const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");

const { requireAuth } = require("../middleware/requireAuth");
const { UserType } = require("./userSchema");

const VitalSign = require("../models/vitalSign");
const User = require("../models/user");

const VitalSignType = new GraphQLObjectType({
    name: "VitalSign",
    fields: () => ({
      id: { type: GraphQLString },
      bodyTem: { type: GraphQLFloat },
      heartRate: { type: GraphQLFloat },
      bloodPre: { type: GraphQLFloat },
      respiratoryRate: { type: GraphQLFloat },
      createdAt: { type: GraphQLString },
      diagnosis: { type: GraphQLString },
      patient: {
        type: UserType,
        resolve: async (parent, args) => {
          return await User.findById(parent.patient);
        },
      },
    }),
  });

// Query

const vitalSigns = {
    type: new GraphQLList(VitalSignType),
    args: { id: { type: GraphQLString } },
    resolve: async (parent, args, context) => {
      await requireAuth(context);
      return await VitalSign.find({ patient: args.id });
    },
  };

const vitalSign = {
    type: VitalSignType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args, context) => {
      await requireAuth(context);
      return VitalSign(findById(args.id));
    },
  };


// Mutations

const addVitalSign = {
    type: VitalSignType,
    args: {
      bodyTem: { type: GraphQLNonNull(GraphQLFloat) },
      heartRate: { type: GraphQLNonNull(GraphQLFloat) },
      bloodPre: { type: GraphQLNonNull(GraphQLFloat) },
      respiratoryRate: { type: GraphQLNonNull(GraphQLFloat) },
      patientId: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (parent, args, context) {
      try {
        await requireAuth(context);
        const vitalSign = await VitalSign.create({
          bodyTem: args.bodyTem,
          heartRate: args.heartRate,
          bloodPre: args.bloodPre,
          respiratoryRate: args.respiratoryRate,
          patient: args.patientId,
        });
        return vitalSign;
      } catch (error) {
        throw Error(error.message);
      }
    },
  };

const updateDiagnosis = {
  type: VitalSignType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
    diagnosis: { type: GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parent, args, context) => {
    try {
      await requireAuth(context)
      const { id, diagnosis } = args
      const updatedVitalSign = await VitalSign.findByIdAndUpdate(id, {
        diagnosis
      }, { new: true })
      return updatedVitalSign;
    } catch (error) {
      throw Error(error.message);
    }
  }
}; 

const deleteVitalSign = {
    type: VitalSignType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(paretn, args) {
      return VitalSign.findByIdAndRemove(args.id);
    },
  };


const vitalSignQuery = {
    vitalSigns,
    vitalSign
}

const vitalSignMutation = {
    addVitalSign,
    deleteVitalSign,
    updateDiagnosis
}

module.exports = { VitalSignType, vitalSignQuery, vitalSignMutation }
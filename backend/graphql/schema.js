const { userQuery, userMutation } = require("./userSchema");
const { motivationalTipQuery, motivationalTipMutation } = require("./motivationalTipSchema");
const { emergencyAlertQuery, emergencyAlertMutation } = require("./emergencySchema");
const { vitalSignQuery, vitalSignMutation } = require("./vitalSignSchema");
const { trainAndPredict } = require('../AI/predictPressure')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");




const predictionType = new GraphQLObjectType({
  name: "predictBloodPressure",
  fields: () => ({
    row: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userQuery,
    ...motivationalTipQuery,
    ...emergencyAlertQuery,
    ...vitalSignQuery,
    predictBloodPressure: {
      type: predictionType,
      args: { bloodPre: { type: GraphQLNonNull(GraphQLFloat) } },
      resolve: async (parent, args) => {
        const { bloodPre } = args
        const prediction = await trainAndPredict(bloodPre);

        const high = prediction.row[0];
        const normal = prediction.row[1];
        const low = prediction.row[2];

        if (high > normal && high > low) {
          return { row: "high blood pressure" };
        }
        else if (low > normal && low > high) {
          return {
            row: "low blood pressure"
          };
        }
        else {
          return {
            row: "normal"
          };
        }
      }
    }
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userMutation,
    //Motivational Mutation
    ...motivationalTipMutation,
    //EmergencyAlert mutation
    ...emergencyAlertMutation,
    //VitalSign mutation
    ...vitalSignMutation
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require("graphql");

const MotivationalTip = require("../models/motivationalTip");

const { requireAuth } = require("../middleware/requireAuth");
const { UserType } = require("./userSchema");

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

  // Query

  const motiavtionalTip = {
    type: MotivationalTipType,
    resolve: async (parent, args, context) => {
      await requireAuth(context);
      const rand = Math.floor(Math.random() * await MotivationalTip.count());
      const motiavTip = await MotivationalTip.findOne().skip(rand);
      return motiavTip;
    },
  };

  // Mutations

  const addMotivationalTip = {
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
  };

  const deleteMotiavtionalTip =  {
    type: MotivationalTipType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function(parent, args, context) {
      await requireAuth(context);
      return MotivationalTip.findByIdAndRemove(args.id);
    },
  };

  const motivationalTipQuery = {
    motiavtionalTip
  };

  const motivationalTipMutation = {
    addMotivationalTip,
    deleteMotiavtionalTip
  }

  module.exports = { motivationalTipQuery, MotivationalTipType, motivationalTipMutation};

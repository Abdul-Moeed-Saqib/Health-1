const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireAuth } = require('../middleware/requireAuth')


// define type
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
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


const user = {
    type: UserType,
    args: { id: { name: 'email', type: GraphQLString } },
    resolve: async (parent, args) => {
        const email = args.id;
        const user = await User.findOne({ email });
        return user;
    }
}
const patients = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args, context) => {
        await requireAuth(context)
        const patients = await User.find({ role: 'patient' })
        return patients;
    }
}

const userQuery = {
    user,
    patients
}

const userMutation = {

}

module.exports = { userQuery, UserType }
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
    resolve: async (parent, args) => {
        const patients = await User.find({ role: 'patient' })
        return patients;
    }
}

const userQuery = {
    user,
    patients
}

module.exports = { userQuery, UserType }
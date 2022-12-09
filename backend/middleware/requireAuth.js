const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { GraphQLString } = require("graphql");
const { UserType } = require("../graphql/userSchema");

const requireAuth = {
    type: UserType,
    args: {
        token: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        const token = args.token;

        if (!token) {
            throw Error('Authorization token required');
        }

        try {
            const { _id } = jwt.verify(token, process.env.SECRET);

            const user = await User.findById(_id);
            return user;
        } catch (error) {
            throw Error('Request is not authorized');
        }
    }
}

module.exports = { requireAuth };
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { GraphQLString } = require("graphql");
const { UserType } = require("./userSchema");

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

            const userId = await User.findById(_id).select('_id');
            return userId;
        } catch (error) {
            throw Error('Request is not authorized');
        }
    }
}

module.exports = requireAuth;
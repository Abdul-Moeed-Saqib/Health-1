const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = async (context) => {

    const { authorization } = context.req.headers;

    let token

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Bearer abcddsfasfew(token)
            token = authorization.split(' ')[1]

            // decode token
            const { _id } = jwt.verify(token, process.env.SECRET)
            const user = await User.findById(_id).select('-password');
            return user;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    if (!token) {
        throw new Error('Token must be provided')
    }
}

module.exports = { requireAuth };
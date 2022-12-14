const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} = require("graphql");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '3d' });
}


// define type
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        role: { type: GraphQLString },
    }),
});

const LoggedInType = new GraphQLObjectType({
    name: "LoggedIn",
    fields: () => ({
        _id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        role: { type: GraphQLString },
        token: { type: GraphQLString }
    })
})

//query all the users
const user = {
    type: UserType,
    args: { id: { name: "email", type: GraphQLString } },
    resolve: async (parent, args) => {
        const email = args.id;
        const user = await User.findOne({ email });
        return user;
    },
};

//query a list of patients
const patients = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args) => {
        const patients = await User.find({ role: "patient" });
        return patients;
    },
};

//query a single patien
const patient = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const patient = await User.findById(args.id);
        return patient;
    },
};
//query a list of nurse
const nurses = {
    type: new GraphQLList(UserType),
    resolve: async (parent, args) => {
        const nurses = await User.find({ role: "nurse" });
        return nurses;
    },
};

//query a single nurse
const nurse = {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve: async (parent, args) => {
        const nurse = await User.findById(args.id);
        return nurse;
    },
};

//update user
const updateUser = {
    type: UserType,
    args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
        return User.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    address: args.address,
                    city: args.city,
                    phoneNumber: args.phoneNumber,
                },
            },
            { new: true }
        );
    },
};

//delete User
const deleteUser = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
    },
};

//register a user
const register = {
    type: LoggedInType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        role: { type: GraphQLString },
    },
    resolve: async (parent, args) => {

        // validating email and password
        if (!validator.isEmail(args.email)) {
            throw Error('Email is not valid');
        }
        if (!validator.isStrongPassword(args.password)) {
            throw Error('Password not strong enough');
        }
        //Check if the user exists in the DB.
        const userInDb = await User.findOne({ email: args.email });
        if (userInDb != null) {
            throw new Error("Email already registerd. Please use another email.");
        }
        try {
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(args.password, salt);
            //create a new user
            const user = {
                email: args.email,
                password: hashedPassword,
                firstName: args.firstName,
                lastName: args.lastName,
                address: args.address,
                city: args.city,
                phoneNumber: args.phoneNumber,
                role: args.role,
            };

            const newUser = await User.create({ ...user });

            //generate the token
            const token = createToken(newUser._id);

            //define the payload
            const payload = {
                firstName: newUser.firstName,
                role: newUser.role,
                token,
                _id: newUser._id
            }

            return payload;
        } catch (error) {
            throw new Error(error);
        }
    },
};

const login = {
    type: LoggedInType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        if (!args.email || !args.password) {
            throw Error('All fields must be filled');
        }

        let user = await User.findOne({ email: args.email });
        //Check if the user exists
        if (user == null) {
            throw new Error("Invalid Email");
        }
        //Comparing password
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid Password");
        }

        //Create token
        const token = createToken(user._id);

        //define the payload
        const payload = {
            firstName: user.firstName,
            role: user.role,
            token,
            _id: user._id
        }

        return payload;
    },
};

const userQuery = {
    user,
    patients,
    patient,
    nurses,
    nurse,
};

const userMutation = {
    register,
    login,
    updateUser,
    deleteUser,
};

module.exports = { userQuery, UserType, userMutation };
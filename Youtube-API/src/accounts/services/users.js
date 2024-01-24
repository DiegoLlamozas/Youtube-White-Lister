const { User } = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Import the tokenBlacklist set from auth.js
const { tokenBlacklist } = require('../middlewares/auth');

const createUser = async (email,username, password) => {
    const verifyEmail = await User.findOne({ where: { email: email } });
    const verifyUsername = await User.findOne({ where: { username: username } });

    if (verifyEmail) {
        return { error: 'Email is already in use' };
    }
    if (verifyUsername) {
        return { error: 'Username is already in use' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email:email, username:username, password: hashedPassword });
    return user;
};

const LoginUser = async (data) => {
    const authenticated = await User.findOne({where: {email: data.email }});
    if (!authenticated) 
    {
        return { error: "Email is wrong" };
    }

    const validPassword = await bcrypt.compare(data.password, authenticated.password);
    if (!validPassword) 
    {
        return { error: "Password is wrong"}
    }

    const token = jwt.sign(
        {
            id: authenticated.id,
            email: authenticated.email
        },
        'password',{
            expiresIn: '1h',
            }
    );

    return token;
};

const logoutUser = async (token) => {
    console.log('Received token in logoutUser service:', token);

    // Add the token to the blacklist
    tokenBlacklist.add(token);

    console.log('Token added to the blacklist:', tokenBlacklist);

    return { message: 'Logout successful' };
};


const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return { error: 'User with this email does not exist' };
    }

    return user;
};

const getUserById = async(userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        return { error: 'This user account doesn\'t exist' };
    }

    return user;
}

const deleteUser = async(userId, password) => {
    const verifyUser = await User.findByPk(userId);
    const verifyPassword = await bcrypt.compare(password, verifyUser.password);

    if (!verifyUser) {
        return { error: 'This user account doesn\'t exist' };
    }

    if (!verifyPassword) 
    {
        return { error: "Password is wrong"}
    }

    await verifyUser.destroy();

    return { message: 'User deleted successfully :D' };

}

const updateUsername = async(userId,newUsername) => {
    const verifyUser = await User.findByPk(userId);
    const verifyUsername = await User.findOne({
        where: {
            username: newUsername
        }
    });

    if (!verifyUser) {
        return { error: 'This user doesn\'t exist' };
    }

    if(verifyUsername){
        return { error: 'Username is already in use' };
    }

    verifyUser.username = newUsername;
    await verifyUser.save();

    return { message: `Username changed successfully to ${newUsername}!` };
}

const updatePassword = async (userId, userEmail, newPassword) => {
    const user = await User.findByPk(userId);
    const emailUser = await User.findOne({
        where: {
            email: userEmail
        }
    });


    if (!user || !emailUser) {
        return { error: 'User or email are invalid' };
    }

    if (user.email !== emailUser.email) {
        return { error: 'Email doesn\'t match the user' };
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    await user.save();

    return { message: 'Password updated successfully!' };
    
};


module.exports = {
    createUser,
    LoginUser,
    logoutUser,
    getUserById,
    deleteUser,
    updateUsername,
    updatePassword,
}
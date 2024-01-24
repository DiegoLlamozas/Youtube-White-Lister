const { User } = require('../models/users');
const UserService = require('../services/users');
const UserSupport = require('../supports/users');

const createUser = async(req,res) => {
    const { email, username, password } = req.body;

    console.log(email,username,password)
    console.log(req.body)

    try {
        const newUser = await UserService.createUser(email,username,password);
        console.log(newUser)
        if (newUser.error) {
            return res.status(400).send(newUser);
        }
        const newUserResponse = UserSupport.buildUserResponse(newUser);
        console.log(newUserResponse)
        return res.status(200).send(newUserResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
}

const loginUser = async (req, res) => {
    const userData = req.body;
    const userEmail = req.body.email;
    try {
        const loggedUser = await UserService.LoginUser(userData);
        console.log(loggedUser);
        if (loggedUser.error) {
            return res.status(400).send(loggedUser);
        }
        const loggedUserResponse = UserSupport.buildTokenResponse(loggedUser);
        return res.status(201).send(loggedUserResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Get the token from the request headers
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader ? tokenHeader.split(' ')[1] : null;

        console.log('Token Header:', tokenHeader);
        console.log('Token:', token);

        if (token) {
            console.log('Before calling logoutUser service');
            const userLogout = await UserService.logoutUser(token);
            if (userLogout.error) {
                console.log(userLogout.error)
                return res.status(400).send(userLogout);
            }
            console.log('Logout successful');
            return res.status(200).json({ message: 'Logout successful' });
        } else {
            console.log('Invalid token');
            return res.status(400).json({ message: 'Invalid token' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error on server' });
    }
};


const getUserById = async(req,res) => {
    const userId = req.user.id
    console.log(userId)
    try {
        const user = await UserService.getUserById(userId);
        if (user.error) {
            return res.status(400).send(user.error);
        }
        const userResponse = UserSupport.buildUserResponse(user);
        return res.status(201).send(userResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.user.id;
    const password = req.body.password;

    try {
        const deletedUser = await UserService.getUserById(userId);
        const deleteUserResult = await UserService.deleteUser(userId, password);

        if (deleteUserResult.error) {
            return res.status(400).send(deleteUserResult.error);
        }

        const deletedUserResponse = UserSupport.buildUserResponse(deletedUser);
        return res.status(200).send(deletedUserResponse);

    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
};

const updateUsername = async(req, res) => {
    const userId = req.user.id;
    const { username }= req.body;

    console.log(userId);
    console.log(username);

    try {
        const user = await UserService.updateUsername(userId,username);
        if (user.error) {
            return res.status(400).send(user.error)
        }
        const updatedUser = await UserService.getUserById(userId);
        const updatedUserResponse = UserSupport.buildUserResponse(updatedUser)
        return res.status(200).send(updatedUserResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
}

const updatePassword = async (req, res) => {
    const userId = req.user.id;
    const { email, newPassword } = req.body;

    console.log('Received Request Body:', req.body);

    try {
        const updatePasswordResult = await UserService.updatePassword(userId, email, newPassword);

        if (updatePasswordResult.error) {
            return res.status(400).send(updatePasswordResult.error);
        }

        const updatedUser = await UserService.getUserById(userId);
        const updatedUserResponse = UserSupport.buildUserResponse(updatedUser);
        return res.status(200).send(updatedUserResponse);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: 'Error on server',
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserById,
    deleteUser,
    updateUsername,
    updatePassword,
}
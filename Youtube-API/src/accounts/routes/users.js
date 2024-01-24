const router = require('express').Router({ mergeParams: true });

const { validate } = require('./../../config/validate');
const { checkSchema } = require('express-validator');
const { authenticateUser } = require('../middlewares/auth');

const { usersSchema,loginSchema,updateUsernameSchema,updatePasswordSchema, deleteUserSchema } = require('../schemas/users');
const { createUser, loginUser,logoutUser, getUserById, deleteUser, updateUsername, updatePassword } = require('../controllers/users');


router.post('/register', validate(checkSchema(usersSchema)), createUser);
router.post('/login', validate(checkSchema(loginSchema)), loginUser);

// From Here every endpoint requires for the user to be logged
router.use(authenticateUser); 

router.post('/logout',logoutUser);
router.get('/me', getUserById);
router.delete('/me', validate(checkSchema(deleteUserSchema)), deleteUser);
router.put('/me/username', validate(checkSchema(updateUsernameSchema)), updateUsername);
router.put('/me/password', validate(checkSchema(updatePasswordSchema)), updatePassword);

module.exports = {
    router,
};
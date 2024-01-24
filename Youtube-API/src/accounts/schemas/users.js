const usersSchema = {
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        isEmail: {
            errorMessage: "Invalid email format",
        },
    },
    username: {
        notEmpty: true,
        errorMessage: "Username cannot be empty",
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty",
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must contain at least 6 characters",
        },
    },
};

const loginSchema = {
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        isEmail: {
            errorMessage: "Invalid email format",
        },
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
};

const updateUsernameSchema = {
    username: {
        notEmpty: true,
        errorMessage: "Username cannot be empty",
    },
};

const updatePasswordSchema = {
    email: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        isEmail: {
            errorMessage: "Invalid email format",
        },
    },
    newPassword: {
        notEmpty: true,
        errorMessage: "New Password cannot be empty",
        isLength: {
            options: { min: 6 },
            errorMessage: "New password must contain at least 6 characters",
        },
    },
};

const deleteUserSchema = {
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty",
    },
};


module.exports = {
    usersSchema,
    loginSchema,
    updateUsernameSchema,
    updatePasswordSchema,
    deleteUserSchema
};

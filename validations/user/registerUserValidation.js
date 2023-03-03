const UserValidation = require("./userValidation")

module.exports = {
    registerUserRules: function () {
        return [
            UserValidation.emailValidation(),
            UserValidation.passwordValidation(),
            UserValidation.nameValidation(),
            UserValidation.surNameValidation(),
            UserValidation.isEmailUnique()
        ];
    }
}
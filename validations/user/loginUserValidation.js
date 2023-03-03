const UserValidation = require("./userValidation")

module.exports = {
    loginUserRules: function () {
        return [
            UserValidation.emailValidation(),
            UserValidation.passwordValidation()
        ];
    }
}
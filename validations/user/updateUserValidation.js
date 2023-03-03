const UserValidation = require("./userValidation")

module.exports = {
    updateUserRules: function () {
        return [
            UserValidation.nameValidation(),
            UserValidation.surNameValidation(),
            UserValidation.optionalPasswordValidation()
        ]
       
    }
}
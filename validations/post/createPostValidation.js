const PostValidation = require("./postValidation")

module.exports = {
    createPostRules: function () {
        return [
            PostValidation.titleValidation(),
            PostValidation.subTitleValidation(),
            PostValidation.contentValidation()
        ];
    }
}
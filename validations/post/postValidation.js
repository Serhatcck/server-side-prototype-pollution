const { body, validationResult } = require("express-validator");
const validationMessages = require("../../configs/validationMessages")

module.exports = {
    titleValidation() {
        return body('title').exists().withMessage(validationMessages.postTitleMustExist)
            .isLength({ min: 5 }).withMessage(validationMessages.postTitleMin)
            .isLength({ max: 50 }).withMessage(validationMessages.postTitleMax)
            .escape()
    },
    subTitleValidation() {
        return body('subTitle').exists().withMessage(validationMessages.postSubTitleMustExist)
            .isLength({ min: 5 }).withMessage(validationMessages.postSubTitleMin)
            .isLength({ max: 50 }).withMessage(validationMessages.postSubTitleMax)
            .escape()
    },
    contentValidation() {
        return body('content').exists().withMessage(validationMessages.postSubTitleMustExist)
            .isLength({ min: 5 }).withMessage(validationMessages.postContentMin)
            .isLength({ max: 2500 }).withMessage(validationMessages.postContentMax)
            .escape()
    },
    validate: function (req, res, next) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

        return res.status(422).json({
            errors: extractedErrors,
        })
    }

}
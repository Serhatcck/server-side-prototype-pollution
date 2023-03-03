const { body, validationResult } = require("express-validator");
const validationMessages = require("../../configs/validationMessages")
const UserModel = require("../../models/userModel")

module.exports = {
    emailValidation() {
        return body('email').exists().withMessage(validationMessages.emailMustExist)
            .isEmail().withMessage(validationMessages.invalidEmail)
            .normalizeEmail()
            .escape()
    },
    passwordValidation() {
        return body('passwd')
            .isLength({ min: 5 })
            .withMessage(validationMessages.passwdMinFive)
            .isLength({ max: 12 })
            .withMessage(validationMessages.passwdMaxTwelve)
            .matches(/\d/)
            .withMessage(validationMessages.passwdContainNumber)
            .exists()
            .withMessage(validationMessages.passwdMustExist)
            .escape()
    },
    nameValidation() {
        return body('name')
            .isLength({ min: 0 })
            .isLength({ max: 25 })
            .exists()
            .escape()
    },
    surNameValidation() {
        return body('surname')
            .isLength({ min: 0 })
            .isLength({ max: 25 })
            .exists()
            .escape()
    },

    optionalPasswordValidation() {
        return body('passwd')
            .isLength({ min: 5 })
            .withMessage(validationMessages.passwdMinFive)
            .isLength({ max: 12 })
            .withMessage(validationMessages.passwdMaxTwelve)
            .matches(/\d/)
            .withMessage(validationMessages.passwdContainNumber)
            .optional({ checkFalsy: true, nullable: true })
            .escape()

    },

    isEmailUnique() {
        return body("email")
            .custom((value, { req }) => {
                return new Promise((resolve, reject) => {
                    UserModel.getWithEmail(req.sqlCon, { email: value }, function (err, rows) {
                        if (err) throw err;
                        if (typeof (rows) != "undefined" && rows.length > 0) {
                            reject(new Error('E-mail already in use'))
                        } else {
                            resolve(true)
                        }
                    })
                })
            }).withMessage(validationMessages.emailIsExist)
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
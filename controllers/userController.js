const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const profile = (req, res) => {
    session = req.session;
    UserModel.getWithEmail(req.sqlCon, session, async function (err, rows) {
        if (err) throw err;
        const user = new UserModel.User(rows[0])
        res.render("profile", { user: user });
    })

}

const profileUpdate = (req, res) => {
    const user = new UserModel.User(req.body);
    user.userId = req.session.userId;
    UserModel.updateNameEmail(req.sqlCon, user, async function (err, rows) {
        if (err) throw err;
        if (user.passwd) {
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(user.passwd, salt, (err, hash) => {
                    if (err) throw err;
                    user.passwd = hash;

                    UserModel.updatePasswd(req.sqlCon, user, async function (err, rows) {
                        if (err) throw err;
                        return res.status(200).json({
                            "status": true, "message": "Update successful"
                        })
                    })
                })
            );
        } else {
            return res.status(200).json({
                "status": true, "message": "Update successful"
            })
        }
    })


}

module.exports = {
    profile,
    profileUpdate
}
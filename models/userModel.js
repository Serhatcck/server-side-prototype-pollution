function User(data) {
    this.userId = data.userId
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.passwd = data.passwd
    this.location = data.location
    this.isEditor = data.isEditor
}

module.exports = {
    get: function (sqlCon, callback) {
        sqlCon.query("SELECT * FROM user", callback)
    },
    create: function (sqlCon, data, callback) {
        sqlCon.query(
            `INSERT INTO user SET
            email = ${sqlCon.escape(data.email)},
            name = ${sqlCon.escape(data.name)},
            passwd = ${sqlCon.escape(data.passwd)},
            surname = ${sqlCon.escape(data.surname)}`,
            callback
        )
    },
    getWithEmail: function (sqlCon, data, callback) {
        sqlCon.query(
            `SELECT * FROM user where email = ${sqlCon.escape(data.email)}  LIMIT 1`,
            callback
        )
    },
    updateNameEmail: function (sqlCon, data, callback) {
        sqlCon.query(
            `UPDATE USER set name =${sqlCon.escape(data.name)}, surname=${sqlCon.escape(data.surname)} WHERE userId = ${sqlCon.escape(data.userId)}`,
            callback,
        )
    },
    updatePasswd: function(sqlCon,data,callback){
        sqlCon.query(
            `UPDATE USER set passwd =${sqlCon.escape(data.passwd)} WHERE userId = ${sqlCon.escape(data.userId)}`,
            callback,
        )
    },
    User: User
}
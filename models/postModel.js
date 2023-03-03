class Post {
    constructor(data) {
        this.postId = data.postId
        this.userId = data.userId
        this.title = data.title
        this.subTitle = data.subTitle
        this.content = data.content
        this.date = data.date
        this.userName = data.userName
        this.userSurname = data.userSurname
        this.command = ""
    }

}

module.exports = {
    get: function (sqlCon, callback) {
        sqlCon.query("SELECT post.*,user.name userName,user.surname userSurname FROM post,user WHERE post.userId = user.userId order by postId desc", callback)
    },
    create: function (sqlCon, data, callback) {
        sqlCon.query(
            `INSERT INTO post SET
            userId = ${sqlCon.escape(data.userId)},
            title = ${sqlCon.escape(data.title)},
            subTitle = ${sqlCon.escape(data.subTitle)},
            content = ${sqlCon.escape(data.content)},
            date = ${sqlCon.escape(data.date)}`,
            callback
        )
    },
    getWithId: function(sqlCon,postId,callback){
        sqlCon.query(`SELECT post.*,user.name userName,user.surname userSurname FROM post,user WHERE post.userId = user.userId and post.postId = ${sqlCon.escape(postId)}`, callback)

    },
    Post: Post
}
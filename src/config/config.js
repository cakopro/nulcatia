require('dotenv').config()

module.exports = {
    app:{
        port: process.env.PORT || 5000
    },
    mysql:{
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "nulcatia"
    },
    session: {
    secret: process.env.SESSION_SECRET || 'default_secret'
  }
}
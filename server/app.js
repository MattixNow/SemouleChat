const MongoClient = require("mongodb").MongoClient
const io = require("socket.io").listen(3000).sockets
require("dotenv").config()
let users = []
let messages = []
var dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-knq7k.mongodb.net/test?retryWrites=true&w=majority`
const mongo = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
function currentTime() {
    var today = new Date()
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = date + " " + time
    return dateTime
}

mongo.connect((err, client) => {
    // console.log(err ? console.log(err) : currentTime() + " mongodb connected")
    // console.log(db)

    io.on("connection", socket => {
        let chat = client.db("test").collection("chats")
        // console.log(chat)

        chat.find()
            .limit(100)
            .sort({ _id: 1 })
            .toArray((err, res) => {
                if (err) {
                    throw err
                }

                //console.log(res)

                socket.emit("loggedIn", {
                    users: users.map(s => s.username),
                    messages: res
                })
            })
        socket.on("newuser", username => {
            console.log(`${currentTime()} | ${username} has arrived at the party.`)
            socket.username = username

            users.push(socket)

            io.emit("userOnline", socket.username)
        })

        socket.on("msg", data => {
            let name = socket.username
            let message = data

            chat.insert({ username: name, msg: message }, function(err, result) {
                result = result.ops[0]
                messages.push(result)
                io.emit("msg", result)
            })
            if (message == "/clear") {
                io.emit("sys", { username: "Server", msg: "<b>Chat cleared</b> <a href='' onclick='document.location.reload()'>click here to reload</a>" })
                chat.drop()
            }
        })
        socket.on("disconnect", () => {
            console.log(`${currentTime()} | ${socket.username} has left the party.`)
            io.emit("userLeft", socket.username)
            users.splice(users.indexOf(socket), 1)
        })
    })
})

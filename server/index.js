const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoute.js")
const messageRoutes = require("./routes/messagesRoute.js")
const app = express()
const socket = require("socket.io")

require("dotenv").config()

app.use(cors())

app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	}).then(()=> {
		console.log("MongoDB connection success")
	}).catch((error) => {
		console.log(error.message)
})

const server = app.listen(process.env.PORT, () =>{console.log("all is good")})

const io = socket(server, {
	cors: {
	  origin: "http://localhost:3000",
	  credentials: true,
	},
  });

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id)
	})

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to)
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.message)
		}
	})
})
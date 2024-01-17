import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

const io = new Server({
	cors: {
		origin: process.env.CLIENT_URL,
	},
})

let users = new Map()

const addUser = (userId, socketId) => {
	if (!users.has(userId)) {
		users.set(userId, socketId)
	}
}

const removeUser = socketId => {
	for (const [userId, userSocketId] of users.entries()) {
		if (userSocketId === socketId) {
			users.delete(userId)
			break
		}
	}
}

const getUser = userId => {
	return users.get(userId)
}

io.on('connection', socket => {
	socket.on('join', async userId => {
		addUser(userId, socket.id)
	})

	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId)
		if (user) {
			io.to(user.socketId).emit('getMessage', {
				senderId,
				text,
			})
		}
	})

	socket.on('disconnect', () => {
		removeUser(socket.id)
	})
})

io.listen(process.env.SOCKET_PORT)

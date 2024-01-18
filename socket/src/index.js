import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config()

const io = new Server({
	cors: {
		origin: process.env.CLIENT_URL,
	},
})

let users = []

const addUser = (userId, socketId) => {
	users.push({ userId, socketId })
}

const removeUser = socketId => {
	users = users.filter(user => user.socketId !== socketId)
}

const getUsersByUserId = userId => {
	return users.filter(user => user.userId === userId)
}

io.on('connection', socket => {
	socket.on('join', userId => {
		addUser(userId, socket.id)
	})

	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const usersWithSameId = getUsersByUserId(receiverId)
		usersWithSameId.forEach(user => {
			io.to(user.socketId).emit('getMessage', {
				senderId,
				text,
			})
		})
	})

	socket.on('typing', ({ receiverId }) => {
		const usersWithSameId = getUsersByUserId(receiverId)
		usersWithSameId.forEach(user => {
			io.to(user.socketId).emit('responseTyping')
		})
	})

	socket.on('disconnect', () => {
		removeUser(socket.id)
	})
})

io.listen(process.env.SOCKET_PORT)

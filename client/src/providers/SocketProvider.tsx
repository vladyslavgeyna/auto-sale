'use client'

import { useUserStore } from '@/store/user'
import { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { useShallow } from 'zustand/react/shallow'

const initialSocket = io(String(process.env.NEXT_PUBLIC_SOCKET_URL))

const SocketContext = createContext<Socket>(initialSocket)

export const useSocket = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [isSocketConnected, setIsSocketConnected] = useState(false)
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	useEffect(() => {
		if (user && !isSocketConnected) {
			initialSocket.emit('join', user.id)
			setIsSocketConnected(true)
		}
	}, [user])

	useEffect(() => {
		return () => {
			initialSocket.disconnect()
			setIsSocketConnected(false)
		}
	}, [])

	return (
		<SocketContext.Provider value={initialSocket}>
			{children}
		</SocketContext.Provider>
	)
}

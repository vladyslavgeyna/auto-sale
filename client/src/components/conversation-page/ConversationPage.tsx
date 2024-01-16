'use client'
import { useGetConversationMessages } from '@/hooks/useGetConversationMessages'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useSocket } from '@/providers/SocketProvider'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { generateRandomInt } from '@/utils/utils'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'
import Forbidden from '../forbidden/Forbidden'
import Loader from '../loader/Loader'
import Message from '../message/Message'
import NotFound from '../not-found/NotFound'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'

const ConversationPage = ({ conversationId }: { conversationId: string }) => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const queryClient = useQueryClient()

	const socket = useSocket()

	const scrollRef = useRef<HTMLDivElement>(null)

	const [newMessage, setNewMessage] = useState('')
	const [arrivalMessage, setArrivalMessage] = useState<{
		senderId: string
		text: string
		dateOfCreation: string
	} | null>(null)

	const {
		data: conversationMessages,
		isLoading: areConversationMessagesLoading,
		isSuccess: isGettingConversationMessagesSuccess,
		isError: isGettingConversationMessagesError,
		isFetching: isConversationMessagesFetching,
		error: getConversationMessagesError,
	} = useGetConversationMessages(conversationId)

	const { mutate: sendMessage, isPending } = useSendMessage(
		conversationId,
		conversationMessages?.[0].firstMember,
		conversationMessages?.[0].secondMember,
		() => {
			setNewMessage('')
		},
	)

	useEffect(() => {
		socket.on(
			'getMessage',
			({ senderId, text }: { senderId: string; text: string }) => {
				setArrivalMessage({
					senderId,
					text,
					dateOfCreation: new Date().toISOString(),
				})
			},
		)
	}, [])

	useEffect(() => {
		if (arrivalMessage) {
			const firstMember = conversationMessages?.[0].firstMember
			const secondMember = conversationMessages?.[0].secondMember

			if (firstMember && secondMember) {
				if (
					firstMember.id === arrivalMessage.senderId ||
					secondMember.id === arrivalMessage.senderId
				) {
					let randomInt = 0

					do {
						randomInt = generateRandomInt(
							1,
							Number.MAX_SAFE_INTEGER,
						)
					} while (conversationMessages.some(m => m.id === randomInt))

					queryClient.setQueryData<IGetConversationMessagesOutput[]>(
						['conversation-messages', conversationId],
						oldMessages => {
							const newMessage: IGetConversationMessagesOutput = {
								id: randomInt,
								text: arrivalMessage.text,
								senderId: arrivalMessage.senderId,
								dateOfCreation: arrivalMessage.dateOfCreation,
								conversationId,
								firstMember: { ...firstMember },
								secondMember: { ...secondMember },
							}
							return [...(oldMessages || []), newMessage]
						},
					)
				}
			}
		}
	}, [arrivalMessage])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [conversationMessages])

	if (areConversationMessagesLoading || isConversationMessagesFetching) {
		return (
			<div className='w-full mt-80 flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (
		!isGettingConversationMessagesSuccess ||
		isGettingConversationMessagesError
	) {
		if (getConversationMessagesError) {
			const error = getConversationMessagesError as AxiosError
			const httpError = IHttpError.toIHttpError(error)
			if (!httpError) {
				redirect('/error')
			}
			if (httpError.status === 404) {
				return <NotFound text={httpError.message} />
			} else if (httpError.status === 403) {
				return <Forbidden text={httpError.message} />
			} else {
				redirect('/error')
			}
		} else {
			redirect('/error')
		}
	}

	const handleSendMessage = () => {
		sendMessage({
			senderId: user.id,
			conversationId,
			text: newMessage,
		})

		const members = [
			conversationMessages[0].firstMember,
			conversationMessages[0].secondMember,
		]

		const receiverId = members.find(m => m.id !== user.id)?.id

		if (receiverId) {
			socket.emit('sendMessage', {
				senderId: user.id,
				receiverId,
				text: newMessage,
			})
		}
	}

	return (
		<div className='max-w-screen-lg m-auto h-[calc(100vh-275px)]'>
			<div className='h-full overflow-y-auto pr-2'>
				{conversationMessages.map(m => (
					<div key={m.id} ref={scrollRef}>
						<Message currentUser={user} message={m} />
					</div>
				))}
			</div>
			<div className='mt-2 flex gap-3 items-center justify-between'>
				<Textarea
					className='p-2 w-[80%] resize-none h-24'
					placeholder='Write something...'
					onChange={e => setNewMessage(e.target.value)}
					value={newMessage}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							handleSendMessage()
						}
					}}
				/>
				{isPending ? (
					<Button className='flex items-center justify-center gap-2 min-w-[100px] min-h-10'>
						<Loader2 className='h-6 w-6 animate-spin' />
					</Button>
				) : (
					<Button
						onClick={handleSendMessage}
						className='flex items-center gap-2 min-w-[100px] min-h-10'>
						<span>Send</span>
						<FiSend className='text-lg' />
					</Button>
				)}
			</div>
		</div>
	)
}

export default ConversationPage

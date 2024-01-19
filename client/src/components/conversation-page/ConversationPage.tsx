'use client'
import { useGetConversation } from '@/hooks/useGetConversation'
import { useGetInfiniteConversationMessages } from '@/hooks/useGetInfiniteConversationMessages'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useUpdateLastConversationVisit } from '@/hooks/useUpdateLastConversationVisit'
import { useSocket } from '@/providers/SocketProvider'
import { useUserStore } from '@/store/user'
import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { IMessageQueryData } from '@/types/message/message-query-data.interface'
import { getMessagesQueryDataPages } from '@/utils/message.utils'
import { generateRandomInt } from '@/utils/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'
import ComplexError from '../complex-error/ComplexError'
import Message from '../message/Message'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import ConversationPageLoader from './ConversationPageLoader'
import LoadMoreMessagesButton from './LoadMoreMessagesButton'
import NoMessages from './NoMessages'
import Typing from './Typing'

type ArrivalMessageType = {
	senderId: string
	text: string
	dateOfCreation: string
}

const ConversationPage = ({ conversationId }: { conversationId: string }) => {
	let timer: NodeJS.Timeout | null = null

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
	const wrapperRef = useRef<HTMLDivElement>(null)

	const [newMessage, setNewMessage] = useState('')
	const [shouldScroll, setShouldScroll] = useState(true)
	const [conversationMessages, setConversationMessages] = useState<
		IGetConversationMessagesOutput[]
	>([])
	const [conversationMessagesCount, setConversationMessagesCount] =
		useState<number>(0)
	const [isMemberTyping, setIsMemberTyping] = useState(false)
	const [arrivalMessage, setArrivalMessage] =
		useState<ArrivalMessageType | null>(null)

	const {
		data: conversation,
		isLoading: isConversationLoading,
		isSuccess: isGettingConversationSuccess,
		isError: isGettingConversationError,
		isFetching: isConversationFetching,
		error: getConversationError,
	} = useGetConversation(conversationId)

	const {
		data: conversationMessagesData,
		isLoading: areConversationMessagesLoading,
		isSuccess: isGettingConversationMessagesSuccess,
		isError: isGettingConversationMessagesError,
		isFetching: isConversationMessagesFetching,
		error: getConversationMessagesError,
		fetchNextPage,
	} = useGetInfiniteConversationMessages(conversationId)

	useEffect(() => {
		if (conversationMessagesData) {
			const conversationMessages = conversationMessagesData.pages
				.slice()
				.reverse()
				.flatMap(m => m.messages)

			setConversationMessages(conversationMessages)

			setConversationMessagesCount(
				conversationMessagesData.pages[0].count,
			)
		}
	}, [conversationMessagesData])

	const { mutate: sendMessage, isPending } = useSendMessage(
		conversationId,
		conversation?.firstMember,
		conversation?.secondMember,
		() => {
			setNewMessage('')
		},
	)

	const { mutate: updateLastVisit } = useUpdateLastConversationVisit(
		conversationId,
		user.id,
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

		socket.on('responseTyping', () => {
			timer && clearTimeout(timer)
			setIsMemberTyping(true)
			timer = setTimeout(() => {
				setIsMemberTyping(false)
			}, 500)
		})

		return () => {
			updateLastVisit(conversationId)
		}
	}, [])

	const getConversationMessageRandomId = () => {
		let randomInt = 0

		do {
			randomInt = generateRandomInt(1, Number.MAX_SAFE_INTEGER)
		} while (conversationMessages.some(m => m.id === randomInt))

		return randomInt
	}

	useEffect(() => {
		if (arrivalMessage) {
			const firstMember = conversation?.firstMember
			const secondMember = conversation?.secondMember

			if (firstMember && secondMember) {
				if (
					firstMember.id === arrivalMessage.senderId ||
					secondMember.id === arrivalMessage.senderId
				) {
					let randomInt = getConversationMessageRandomId()

					setShouldScroll(true)

					setConversationMessagesCount(prev => prev + 1)

					queryClient.setQueryData<IMessageQueryData>(
						['conversation-messages', conversationId],
						oldMessagesData => {
							const newMessage: IGetConversationMessagesOutput = {
								id: randomInt,
								text: arrivalMessage.text,
								senderId: arrivalMessage.senderId,
								dateOfCreation: arrivalMessage.dateOfCreation,
								conversationId,
								firstMember: { ...firstMember },
								secondMember: { ...secondMember },
							}

							return getMessagesQueryDataPages(
								newMessage,
								oldMessagesData,
							)
						},
					)
				}
			}
		}
	}, [arrivalMessage])

	useEffect(() => {
		if (shouldScroll) {
			scrollRef.current?.scrollIntoView({ behavior: 'instant' })
		} else {
			//1400 refers to height of +-22 messages
			wrapperRef.current?.scrollTo(0, 1400)
		}
	}, [conversationMessages])

	if (isConversationLoading || isConversationFetching) {
		return <ConversationPageLoader />
	}

	if (!isGettingConversationSuccess || isGettingConversationError) {
		return <ComplexError error={getConversationError} />
	}

	if (
		areConversationMessagesLoading ||
		(areConversationMessagesLoading && isConversationMessagesFetching)
	) {
		return <ConversationPageLoader />
	}

	if (
		!isGettingConversationMessagesSuccess ||
		isGettingConversationMessagesError
	) {
		return <ComplexError error={getConversationMessagesError} />
	}

	const getReceiverId = () => {
		const members = [conversation.firstMember, conversation.secondMember]

		return members.find(m => m.id !== user.id)?.id
	}

	const handleSendMessage = () => {
		const message = newMessage.trim()
		if (message && !isPending) {
			setShouldScroll(true)
			setConversationMessagesCount(prev => prev + 1)

			sendMessage({
				senderId: user.id,
				conversationId,
				text: message,
			})

			const receiverId = getReceiverId()

			if (receiverId) {
				socket.emit('sendMessage', {
					senderId: user.id,
					receiverId,
					text: message,
				})
			}
		}
	}

	return (
		<div className='max-w-screen-lg m-auto h-[calc(100vh-350px)] sm:h-[calc(100vh-275px)]'>
			<div ref={wrapperRef} className='h-full overflow-y-auto pr-2 pb-6'>
				{conversationMessages &&
				conversationMessagesCount &&
				conversationMessages.length < conversationMessagesCount ? (
					<LoadMoreMessagesButton
						isLoading={isConversationMessagesFetching}
						onClick={() => {
							setShouldScroll(false)
							fetchNextPage()
						}}
					/>
				) : (
					conversationMessagesCount > 0 && (
						<div className='text-lg border rounded-lg p-1.5 font-bold text-center'>
							All messages are loaded
						</div>
					)
				)}
				{conversationMessages && conversationMessages.length > 0 ? (
					conversationMessages.map(m => (
						<div key={m.id} ref={scrollRef}>
							<Message currentUser={user} message={m} />
						</div>
					))
				) : (
					<NoMessages />
				)}
			</div>
			<Typing isTyping={isMemberTyping} />
			<div className='mt-2 flex gap-2 flex-col sm:flex-row items-center justify-between'>
				<Textarea
					className='p-2 w-full sm:w-[80%] text-base resize-none h-24'
					placeholder='Write something...'
					onChange={e => {
						setNewMessage(e.target.value)
					}}
					value={newMessage}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							handleSendMessage()
						} else {
							if (timer === null) {
								const receiverId = getReceiverId()

								if (receiverId) {
									socket.emit('typing', {
										receiverId,
									})
									timer = setTimeout(() => {
										timer = null
									}, 500)
								}
							}
						}
					}}
				/>
				{isPending ? (
					<Button className='flex items-center justify-center gap-2 w-full sm:w-[initial] min-w-[125px] min-h-10'>
						<Loader2 className='h-6 w-6 animate-spin' />
					</Button>
				) : (
					<Button
						onClick={handleSendMessage}
						className='flex items-center gap-2 min-w-[125px] min-h-10 w-full sm:w-[initial]'>
						<span>Send</span>
						<FiSend className='text-lg' />
					</Button>
				)}
			</div>
		</div>
	)
}

export default ConversationPage

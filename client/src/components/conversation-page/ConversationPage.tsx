'use client'
import { useGetConversation } from '@/hooks/useGetConversation'
import { useSendMessage } from '@/hooks/useSendMessage'
import { useUpdateLastConversationVisit } from '@/hooks/useUpdateLastConversationVisit'
import { useSocket } from '@/providers/SocketProvider'
import messageService from '@/services/message.service'
import { useUserStore } from '@/store/user'
import IGetConversationMessagesOutput from '@/types/message/get-conversation-messages-output.interface'
import { generateRandomInt } from '@/utils/utils'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'
import ComplexError from '../complex-error/ComplexError'
import Loader from '../loader/Loader'
import Message from '../message/Message'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'

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
	const [arrivalMessage, setArrivalMessage] = useState<{
		senderId: string
		text: string
		dateOfCreation: string
	} | null>(null)

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
	} = useInfiniteQuery({
		queryKey: ['conversation-messages', conversationId],
		queryFn: async ({ pageParam = 1 }) => {
			const { data } = await messageService.getAllConversationMessages(
				conversationId,
				pageParam,
			)
			return data
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage.messages.length ? pages.length + 1 : undefined
		},
		initialPageParam: 1,
	})

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

	useEffect(() => {
		if (arrivalMessage) {
			const firstMember = conversation?.firstMember
			const secondMember = conversation?.secondMember

			if (firstMember && secondMember) {
				if (
					firstMember.id === arrivalMessage.senderId ||
					secondMember.id === arrivalMessage.senderId
				) {
					let randomInt = 0

					if (
						conversationMessages &&
						conversationMessages.length > 0
					) {
						do {
							randomInt = generateRandomInt(
								1,
								Number.MAX_SAFE_INTEGER,
							)
						} while (
							conversationMessages.some(m => m.id === randomInt)
						)
					}

					setShouldScroll(true)

					setConversationMessagesCount(prev => prev + 1)

					queryClient.setQueryData<{
						pageParams: number[]
						pages: Array<{
							count: number
							messages: Array<IGetConversationMessagesOutput>
						}>
					}>(
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

							const updatedPages =
								oldMessages?.pages.map(page => ({
									count: page.count + 1,
									messages: [...page.messages, newMessage],
								})) || []

							return {
								pageParams: oldMessages?.pageParams || [1],
								pages: updatedPages,
							}
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
			wrapperRef.current?.scrollTo(0, 800)
		}
	}, [conversationMessages])

	if (isConversationLoading || isConversationFetching) {
		return (
			<div className='w-full mt-80 flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (!isGettingConversationSuccess || isGettingConversationError) {
		return <ComplexError error={getConversationError} />
	}

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
					<Button
						className='w-full'
						variant={'secondary'}
						onClick={() => {
							setShouldScroll(false)
							fetchNextPage()
						}}>
						Load more messages
					</Button>
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
					<p className='text-center text-5xl text-gray-300 font-bold'>
						There is no messages yet
						<br />
						Write the first message
					</p>
				)}
			</div>
			{isMemberTyping ? (
				<div
					className={
						'italic font-medium text-gray-500 animate-pulse'
					}>
					<span className='ml-2'>Typing...</span>
				</div>
			) : (
				<div className='h-6'></div>
			)}
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

'use client'
import { useGetUserConversations } from '@/hooks/useGetUserConversations'
import { useUserStore } from '@/store/user'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import Chat from '../chat/Chat'
import ComplexError from '../complex-error/ComplexError'
import Loader from '../loader/Loader'
import Title from '../ui/Title'

const ChatPage = () => {
	const { user } = useUserStore(
		useShallow(state => ({
			user: state.user,
		})),
	)

	if (!user) {
		redirect('/')
	}

	const {
		data: userConversations,
		isLoading: areUserConversationsLoading,
		isSuccess: isGettingUserConversationsSuccess,
		isError: isGettingUserConversationsError,
		isFetching: isUserConversationsFetching,
		error: getUserConversationsError,
	} = useGetUserConversations(user.id)

	if (areUserConversationsLoading || isUserConversationsFetching) {
		return (
			<div className='w-full mt-80 flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (!isGettingUserConversationsSuccess || isGettingUserConversationsError) {
		return <ComplexError error={getUserConversationsError} />
	}

	return (
		<>
			{userConversations.length > 0 ? (
				<>
					<Title>Chat</Title>
					<Chat conversations={userConversations} />
				</>
			) : (
				<Title className='text-center'>
					You don't have any conversation
				</Title>
			)}
		</>
	)
}

export default ChatPage

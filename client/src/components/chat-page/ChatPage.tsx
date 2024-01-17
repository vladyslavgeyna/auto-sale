'use client'
import { useGetUserConversations } from '@/hooks/useGetUserConversations'
import { useUserStore } from '@/store/user'
import { IHttpError } from '@/types/http-error.interface'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import Chat from '../chat/Chat'
import Forbidden from '../forbidden/Forbidden'
import Loader from '../loader/Loader'
import NotFound from '../not-found/NotFound'
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
		if (getUserConversationsError) {
			const error = getUserConversationsError as AxiosError
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

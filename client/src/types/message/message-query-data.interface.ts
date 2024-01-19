import IGetConversationMessagesOutput from './get-conversation-messages-output.interface'

export interface IMessageQueryData {
	pageParams: number[]
	pages: Array<{
		count: number
		messages: Array<IGetConversationMessagesOutput>
	}>
}

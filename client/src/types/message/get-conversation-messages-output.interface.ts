import IMember from '../conversation/member.interface'

export default interface IGetConversationMessagesOutput {
	id: number
	text: string
	senderId: string
	dateOfCreation: string
	conversationId: string
	firstMember: IMember
	secondMember: IMember
}

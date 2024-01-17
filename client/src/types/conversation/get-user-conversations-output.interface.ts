import IMember from './member.interface'

export default interface IGetUserConversationsOutput {
	id: string
	firstMember: IMember
	secondMember: IMember
	lastMessageDateOfCreation: string | null
	lastMessageSenderId: string | null
	lastFirstMemberVisit: string | null
	lastSecondMemberVisit: string | null
}

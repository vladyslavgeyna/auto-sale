import IMember from './member.interface'

export default interface IGetConversationByIdOutput {
	id: string
	firstMember: IMember
	secondMember: IMember
}

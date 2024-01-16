import IMember from './member.interface'

export default interface IGetUserConversationsOutput {
	id: string
	firstMember: IMember
	secondMember: IMember
}

import MemberDto from './member.dto'

export default interface GetUserConversationsOutputDto {
	id: string
	firstMember: MemberDto
	secondMember: MemberDto
	lastMessageDateOfCreation: string | null
	lastMessageSenderId: string | null
	lastFirstMemberVisit: string | null
	lastSecondMemberVisit: string | null
}

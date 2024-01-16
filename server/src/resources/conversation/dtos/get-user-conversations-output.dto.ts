import MemberDto from './member.dto'

export default interface GetUserConversationsOutputDto {
	id: string
	firstMember: MemberDto
	secondMember: MemberDto
}

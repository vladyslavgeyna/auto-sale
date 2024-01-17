import MemberDto from './member.dto'

export default interface GetConversationByIdOutputDto {
	id: string
	firstMember: MemberDto
	secondMember: MemberDto
}

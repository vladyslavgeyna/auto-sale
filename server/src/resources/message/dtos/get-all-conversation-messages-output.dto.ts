import MemberDto from '../../conversation/dtos/member.dto'
import MessageDto from './message.dto'

export default interface GetAllConversationMessagesOutputDto
	extends MessageDto {
	firstMember: MemberDto
	secondMember: MemberDto
}

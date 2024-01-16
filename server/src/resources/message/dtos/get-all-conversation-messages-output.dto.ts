import ConversationDto from '../../conversation/dtos/conversation.dto'
import MessageDto from './message.dto'

export default interface GetAllConversationMessagesOutputDto
	extends MessageDto,
		Omit<ConversationDto, 'id'> {}

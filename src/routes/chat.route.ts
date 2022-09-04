import { CustomRoute } from '../utils/route.utils';
import { Router } from 'express';
import chatController from '../controllers/chat.controller';

class Chat extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.get('/get-chats', chatController.getChatsWithPeople);
		this.Route.get(
			'/get-recent-chat-list',
			chatController.getRecentChatList
		);
	}
}

export default Chat;

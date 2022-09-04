import { MongooseChatSchema } from './mongoose';

export interface SendMessagePayload {
	to: string;
	content: string;
}

export interface SendMessageResponse extends MongooseChatSchema {
	avatar: string;
}

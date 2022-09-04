export interface MongooseChatSchema {
	from: string;
	to: string;
	content: string;
	sendTime: number;
	emoji?: string;
	seen?: boolean;
}

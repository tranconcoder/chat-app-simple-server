import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema(
	{
		from: { type: String, required: true },
		to: { type: String, required: true },
		content: { type: String, required: true },
		sendTime: { type: Number },
		emoji: { type: String },
		seen: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

chatSchema.pre('save', function () {
	this.sendTime = this.sendTime || new Date().getTime();
});

export interface RecentChatsChatItemProps {
	peopleId: string;
	avatar: string;
	name: string;
	lastMessage?: string;
	lastMessageSendTime?: number;
	unSeenCount?: number;
}

export default mongoose.model('chat', chatSchema);

import { Request, Response } from 'express';
import chatSchemaDb from '../database/schema/chat.schema.db';
import { MongooseChatSchema } from '../types/mongoose';

class Chat {
	public async getChatsWithPeople(req: Request, res: Response) {
		const userId = (req.body.tokenPayload?.googleId ||
			req.body.tokenPayload?.userId) as string;
		const messageList = await chatSchemaDb
			.find({
				$or: [
					{
						from: userId,
						to: req.query.peopleChatId,
					},
					{
						from: req.query.peopleChatId,
						to: userId,
					},
				],
			})
			.sort({ sendAt: -1 });

		res.json(messageList || []);
	}

	public async getRecentChatList(req: Request, res: Response) {
		try {
			const userProfile = req.body.tokenPayload;
			const userId: string =
				userProfile.googleId || userProfile.userId || '';

			async function getTenPeople(currentPeopleCount = 0) {
				const peopleCount = currentPeopleCount;
			}

			const peopleList = [];
			let skipSteps = 0;

			while (peopleList.length < 10) {
				await chatSchemaDb
					.find({
						$or: [
							{
								from: { id: userId },
							},
							{
								to: { id: userId },
							},
						],
					})
					.limit(20)
					.skip(skipSteps)
					.sort({ updatedAt: -1 });
			}

			const allMessage = await chatSchemaDb
				.find({
					$or: [
						{
							from: { id: userId },
						},
						{
							to: { id: userId },
						},
					],
				})
				.limit(20)
				.sort({ updatedAt: -1 });

			const allPeopleChat = [];

			allMessage.forEach((message) => {});

			res.json(allMessage);

			console.log(allMessage);
		} catch (err) {
			console.log(err);
			res.status(500).send('Error while get message list.');
		}
	}
}

export default new Chat();

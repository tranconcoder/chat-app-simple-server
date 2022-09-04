import { Server } from 'socket.io';
import { createServer } from 'http';
import { Application } from 'express';
import { Server as HttpServer } from 'http';
import { verifyToken } from '../../utils/token.utils';
import { decode } from 'jsonwebtoken';
import chatSchemaDb from '../../database/schema/chat.schema.db';
import {
	ProfileTransformedGoogle,
	ProfileTransformedLocal,
} from '../../types/transformers';
import { messageSendedSchema } from '../../config/validateSchema.config';
import { Validator } from 'jsonschema';
import { SendMessagePayload, SendMessageResponse } from '../../types/socket';

export default function setupSocket(app: Application): [HttpServer, Server] {
	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		path: '/socket',
		upgradeTimeout: 3000,
		cors: {
			origin: 'http://localhost:4000',
		},
	});

	io.on('connect', (socket) => {
		try {
			const accessToken =
				socket.request.headers.authorization?.split(' ').at(-1) || '';

			verifyToken(accessToken, 'access');

			let googleProfile: ProfileTransformedGoogle | null = null;
			let localProfile: ProfileTransformedLocal | null = null;
			const userData = decode(accessToken) as
				| ProfileTransformedGoogle
				| ProfileTransformedLocal;

			if (userData.accountType === 'google') googleProfile = userData;
			else localProfile = userData;

			// Auto join init room
			const initRoom =
				googleProfile?.googleId || localProfile?.userId || '';
			socket.join(initRoom);

			socket.on('send-message', (messageInfo: SendMessagePayload) => {
				const dataToSave: SendMessageResponse = {
					avatar: googleProfile?.avatar || localProfile?.avatar || '',
					from: googleProfile?.googleId || localProfile?.userId || '',
					to: messageInfo.to,
					content: messageInfo.content,
					sendTime: new Date().getTime(),
				};

				const validator = new Validator();
				const validateResult = validator.validate(
					dataToSave,
					messageSendedSchema
				);

				if (!validateResult.valid)
					return console.log('error while send message!');

				const messageToSave = new chatSchemaDb(dataToSave);
				messageToSave.save();

				// Emit to receiver
				socket
					.to(messageInfo.to)
					.emit('receive-message', messageToSave);
			});
		} catch (err) {
			socket.disconnect();
		}
	});

	return [httpServer, io];
}

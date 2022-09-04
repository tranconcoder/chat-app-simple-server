import { Request, Response } from 'express';
import authSchemaDb from '../database/schema/auth.schema.db';
import { toLowerCaseNonAccentVietnamese } from '../utils/common.util';

class Search {
	public async searchChat(req: Request, res: Response) {
		try {
			const nameToSearch = (req.query?.search || '') as string;

			const userSearchListResult = await authSchemaDb
				.find({
					fullNameNoAccent: {
						$regex: toLowerCaseNonAccentVietnamese(
							nameToSearch.trim()
						),
						$options: 'i',
					},
				})
				.limit(10);

			res.json(userSearchListResult);
		} catch (err) {
			console.error(err);

			res.status(500).json(err);
		}
	}
}

export default new Search();

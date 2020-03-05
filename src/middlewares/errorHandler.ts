import Koa from 'koa';
import { ValidateError, ResError, CodeAndMessage, ResultEnum } from '../util/response';
import logger from '../util/log';
export default function errorHandler() {
	return async (ctx: Koa.Context, next: Function) => {
		try {
			await next();
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error);
				const fileMax = error.message.includes('maxFileSize exceeded');
				if (fileMax) {
					ctx.body = new CodeAndMessage(ResultEnum.FILE_LARGE.code, ResultEnum.FILE_LARGE.message);
				} else {
					ctx.body = new ResError();
				}
			} else {
				ctx.body = error;
			}
		}
	};
};

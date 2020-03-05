import Koa from "koa";
import { Controller, Http } from '../decorator/http';
import Redis from '../service/redis';
import { ResSuccess, ResError } from '../util/response';
import appService from '../service/Service';
import log from '../util/log';
@Controller("/a")
export default class ExampleRouter {

	@Http({
		url: "/b",
		method: "post",
		validate: {
			// pageInfo: {
			//     pageId: {
			//         type: Number,
			//         required: false
			//     },
			//     pageSize: {
			//         type: Number,
			//         required: false
			//     },
			//     dataCount: {
			//         type: Number,
			//         required: false
			//     },
			// },
			// orderBy: {
			//     field: {
			//         type: String,
			//         enum: ['createdAt', 'updatedAt'],
			//         required: false
			//     },
			//     desc: {
			//         type: Boolean,
			//         required: false
			//     }
			// }

		}
	})
	async facewarp(ctx: Koa.Context) {
		//    const pageInfo: PageInfo = ctx.request.data.pageInfo
		// const orderBy = ctx.request.data.orderBy
		// const data = ctx.request.data
		// let query = {}
		// const result = await MediaService.list(query, pageInfo, orderBy)
		// return ctx.body = new ResSuccess(result)
		ctx.body = "asdasd";
	}
}

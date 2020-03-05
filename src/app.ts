import "reflect-metadata";
import config from './config';
import logger from './util/log';
import body from "koa-body";
import glob from 'glob';
import path from "path";
import koa_static from "koa-static";
import compose from 'koa-compose';
import fs from 'fs';
import http from 'http';
import https from 'https';
import Koa from 'koa';
import cors from 'koa2-cors';
import mongoose from 'mongoose';
import ReqLog from './middlewares/reqLog';
import Redis from './service/redis';
import ScheduleService from './service/schedulerService';
import ErrorHandler from './middlewares/errorHandler';
const app = new Koa();

logger.info('Loading config:' + process.env.NODE_ENV);

let a = "";
let v = "";
// init middlewares
const middlewares = [
	cors(),
	ReqLog(),
	ErrorHandler(),
	body({
		multipart: true,
		// formidable: {
		// 	maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
		// }
	}),
	koa_static(__dirname + '/public') // static public
];

app.use(compose(middlewares));
// register router
glob.sync(__dirname + '/router/*.*{ts,js}').forEach(item => {
	const Router = require(item).default;
	if (!Router) {
		throw new Error(item + " no default");
	}
	const router = new Router();
	app.use(router.routes()).use(router.allowedMethods());
});

// mongo
// mongoose.connect(config.db.mongo, { useNewUrlParser: true })

// redis
// Redis.init()

// 定时器
ScheduleService.start();

// listening
if (config.protocol === 'http') {
	http.createServer(app.callback()).listen(config.port);
} else if (config.protocol === 'https') {
	if (typeof config.port == 'string' && config.port.indexOf(',')) {
		const portArr = config.port.split(',');
		http.createServer(app.callback()).listen(portArr[0]);
		https.createServer({
			key: fs.readFileSync(path.resolve(__dirname, config.tls.key)),
			cert: fs.readFileSync(path.resolve(__dirname, config.tls.cert))
		}, app.callback()).listen(portArr[1]);
	} else {
		https.createServer({
			key: fs.readFileSync(path.resolve(__dirname, config.tls.key)),
			cert: fs.readFileSync(path.resolve(__dirname, config.tls.cert))
		}, app.callback()).listen(config.port);
	}
} else {
	throw new Error('config.protocol is null');
}
logger.info('protocol: ' + config.protocol + ' listening: ' + config.port);
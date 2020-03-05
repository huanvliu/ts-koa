import fs from 'fs';
import path from 'path';
const env: string = (process.env.NODE_ENV || 'development').trim();
let config;
if (fs.existsSync(path.resolve(__dirname, './default.ts'))) {
    config = require('./default');
}
const envConfig = require('./' + env + '.ts');
// 支持第一层配置
config = Object.assign({}, config, envConfig);
export default config;
import { PageInfo } from '../decorator/http';
import mongoose from 'mongoose';
export default class MongoUtil {
    //数据量比较少的时候可以使用这种。
    public static async pageBySkip(model: mongoose.Model<any>, query: any, pageInfo: PageInfo, orderBy?: any) {
        if (!orderBy || !Object.keys(orderBy).length) {
            orderBy = {
                _id: -1
            };
        }
        if (!pageInfo.dataCount) {
            pageInfo.dataCount = await model.find(query).count();
        }
        const rows = await model.find(query).sort(orderBy).limit(pageInfo.pageSize).skip((pageInfo.pageId - 1) * pageInfo.pageSize);
        return { pageInfo, rows };
    }

    // 因为 skip() 函数比较消耗资源，所以下面的方式避开使用 skip () 操作。
    public static async pageByCursor(model: mongoose.Model<any>, query: any, pageInfo: PageInfo, orderBy?: any) {
        orderBy = orderBy || {};
        let returnOrderBy = {
            _id: -1
        };
        const arr = Object.keys(orderBy);
        if (arr.length > 0) {
            delete returnOrderBy._id;
            returnOrderBy[arr[0]] = orderBy.arr[0] * -1;
        }

        if (!pageInfo.dataCount) {
            pageInfo.dataCount = await model.find(query).count();
        }

        const cursor = await model.find(query).sort(returnOrderBy).limit(1).cursor();

        let latest = await cursor.next();
        let rows;
        if (latest) {
            // console.log(1111, latest)
            // query[cursorField] = { $gte: latest._id }
            rows = await model.find(query).sort(orderBy).limit(pageInfo.pageSize);
        } else {
            rows = await model.find(query).sort(orderBy).limit(pageInfo.pageSize);
        }
        // console.log(rows)
        // return { pageInfo, rows }
    }
}

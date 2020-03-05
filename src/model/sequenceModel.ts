import { prop, Typegoose, ModelType, InstanceType, arrayProp, index } from 'typegoose';
import * as mongoose from 'mongoose';

class Sequence extends Typegoose {

    @prop({ index: true })
    name: string

    @prop({ default: 10000 })
    num: number
}

const SequencelModel = new Sequence().getModelForClass(Sequence, { schemaOptions: { timestamps: true } });

export default SequencelModel;
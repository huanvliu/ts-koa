import SequencelModel from '../model/sequenceModel';

export default class sequenceService {

    public static async getUniqueSequence(name: string) {
        let result = await SequencelModel.findOneAndUpdate(
            { name },
            { $inc: { num: 1 } },
            { new: true, upsert: true },
        );
        if (result.num <= 10000) {
            result = await SequencelModel.findOneAndUpdate({ name }, { num: 10001 }, { new: true });
        }
        return result.num;
    }
}

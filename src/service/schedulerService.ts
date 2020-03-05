import Schedule from 'node-schedule';
import moment from 'moment';
export default class ScheduleService {
    public static async start() {
        const time = moment('2019-12-20 15:35', 'YYYY-MM-DD HH:mm');
        // let j = Schedule.scheduleJob(time.toDate(), async () => {
        //     console.log(1111, Date.now());
        // });
        let i = 0;
        let j = Schedule.scheduleJob('*/1 * * * * *', async () => {
            i++;
            if (i == 10) {
                j.cancel();
            }
            console.log(1111, Date.now());
        });
    }
}

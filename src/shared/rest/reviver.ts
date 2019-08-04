import * as moment from 'moment';

export class Reviver {
  public static revive(res: any) {
    if (typeof res !== 'object') {
      return;
    }
    const regexDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(([\-+])(\d{4}))$/;

    for (const key in res) {
      if (!res.hasOwnProperty(key)) {
        continue;
      }
      const val = res[key];
      let match = null;
      if (typeof val === 'string' && (match = val.match(regexDate))) {
        const dt = moment(val).toDate();
        res[key] = dt;
      } else if (typeof val === 'object') {
        Reviver.revive(val);
      }
    }
  }
}



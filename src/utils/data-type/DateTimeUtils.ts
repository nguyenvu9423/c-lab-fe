import * as moment from 'moment';

export namespace DateTimeUtils {
  export function of(raw: string): moment.Moment {
    return moment.utc(raw).local();
  }
}

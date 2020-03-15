import moment from 'moment';

export function getTimeElapsed(time: string) {
  try {
    return moment(time).fromNow();
  } catch {
    return '';
  }
}

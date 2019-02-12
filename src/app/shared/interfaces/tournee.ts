import * as moment from 'moment';

export interface TourneeInterface {
  hour?: moment.Moment;
  am?: boolean;
  isClicked?: boolean;
  dispo?: number;
}

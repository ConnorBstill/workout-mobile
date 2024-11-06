import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const wait = (ms: number = 1000): Promise<{}> => of().pipe(delay(ms)).toPromise();

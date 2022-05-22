import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
    transform(value: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value.slice().reverse();
    }
}

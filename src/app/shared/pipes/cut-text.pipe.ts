import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {
//пайп сделан так, чтобы сюда еще можно было передавать значение кол-ва отображаемых символов
  transform(value: string, textSize: number): string {
    return (value.length > textSize) ?
      value.slice(0, textSize) + '…' : value;
  }

}

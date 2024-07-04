import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(phone: string): any {
    const formatPhone = phone.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1 ');
    return formatPhone;
  }
}

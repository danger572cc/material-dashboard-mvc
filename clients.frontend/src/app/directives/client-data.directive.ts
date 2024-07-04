import {
  Directive,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';
import { Client } from '../models/client.model';


@Directive({
  selector: '[clientData]',
  inputs: ['clientData']
})

export class ClientDataDirective {
  clientData!: Client;
  @Output('dataReceive') clientDataReceived = new EventEmitter<Client>();

  constructor() { }

  @HostListener('mouseenter', ['$event']) mouseEnter(event: Event) {
    console.debug('{ \n\tEvent: ', `'${event.type}',`, '\n\tClient data: ', this.clientData, '\n}');
    this.clientDataReceived.emit(this.clientData);
  }
  @HostListener('mouseleave', ['$event']) mouseLeave(event: Event) {
    console.debug('Event: ', `'${event.type}'`);
  }
}

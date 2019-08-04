import {Injectable} from '@angular/core';
import {Message} from 'primeng/primeng';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GrowlService {

  private messagesSource = new Subject<Message[]>();
  messages$ = this.messagesSource.asObservable();

  constructor() {
  }

  show() {
    this.messagesSource.next([{severity: 'success', summary: 'Service Message', detail: 'Via MessageService'}]);
  }

  add(severity: string, summary: string, detail: string) {
    this.messagesSource.next([
      {
        severity: severity,
        summary: summary,
        detail: detail
      }]
    );
  }

  addSuccess(summary: string, detail: string = '') {
    this.add('success', summary, detail);
  }

  addWarn(summary: string, detail: string = '') {
    this.add('warn', summary, detail);
  }

  addInfo(summary: string, detail: string = '') {
    this.add('info', summary, detail);
  }

  addError(summary: string, detail: string = '') {
    this.add('error', summary, detail);
  }


}

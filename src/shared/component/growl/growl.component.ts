import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Message} from 'primeng/primeng';
import {GrowlService} from './growl.service';

@Component({
  selector: 'app-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GrowlComponent implements OnInit {

  msgs: Message[] = [];

  constructor(private growlService: GrowlService) {
  }

  ngOnInit() {
    this.growlService.messages$.subscribe(messages => {
      this.msgs = [].concat(this.msgs).concat(messages);
    });
  }

}

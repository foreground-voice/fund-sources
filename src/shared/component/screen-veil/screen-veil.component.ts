import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-screen-veil',
  templateUrl: './screen-veil.component.html',
  styleUrls: ['./screen-veil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScreenVeilComponent implements OnInit {

  @Input()
  title: string = null;

  @Input()
  message: string = null;

  constructor() { }

  ngOnInit() {
  }

}

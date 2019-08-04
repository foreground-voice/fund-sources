import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextInputComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  placeholder: string = '';

  @Input()
  value: string = '';
  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(event: Event) {
    this.valueChange.emit(this.value);
  }
}

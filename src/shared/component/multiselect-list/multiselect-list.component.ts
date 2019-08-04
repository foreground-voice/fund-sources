import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

export interface MultiselectItem<T> {
  label: string;
  checked: boolean;
  value: T;
}

@Component({
  selector: 'app-multiselect-list',
  templateUrl: './multiselect-list.component.html',
  styleUrls: ['./multiselect-list.component.scss']
})
export class MultiselectListComponent<T> implements OnInit {

  @HostBinding('class.manySelect')
  private initClass = true;

  expanded: boolean = false;

  @Input()
  public placeholder = '';

  @Input()
  set items(value: MultiselectItem<T>[]) {
    this._items = value;
    this._selectedItems = this._items.filter(e => e.checked);
    this.selectedItems.emit(this._selectedItems);
  }
  private _items: MultiselectItem<T>[] = [];
  @Output()
  itemsChange: EventEmitter<MultiselectItem<T>[]> = new EventEmitter<MultiselectItem<T>[]>();

  // @Input()
  // set selectedItems(value: MultiselectItem<T>[]) {
  //   this._selectedItems = value;
  // }
  _selectedItems: MultiselectItem<T>[] = [];
  @Output()
  selectedItems: EventEmitter<MultiselectItem<T>[]> = new EventEmitter<MultiselectItem<T>[]>();

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.onInputClick(null);
  }

  onInputClick(event: Event) {
    this.expanded = !event ? false : !(this.expanded);
    if (!(this.expanded)) {
      this.itemsChange.emit(this._items);
      this._selectedItems = this._items.filter(e => e.checked);
      this.selectedItems.emit(this._selectedItems);
    }
  }

  joinSelected(): string {
    return this._selectedItems.map(item => item.label).join('; ');
  }

}

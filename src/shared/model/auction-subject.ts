import {MultiselectItem} from '../../shared/component/multiselect-list/multiselect-list.component';
import {JsonIgnore, JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class AuctionSubject implements MultiselectItem<AuctionSubject> {

  @JsonProperty()
  public id: number = null;

  @JsonProperty()
  public name: string = null;


  // beginning of multiselect-item interface

  @JsonIgnore()
  checked: boolean = false;
  get label(): string {
    return this.name;
  }
  get value(): AuctionSubject {
    return this;
  }

  // end of multiselect-item interface

  constructor(id: number, name: string, checked: boolean = false) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }
}

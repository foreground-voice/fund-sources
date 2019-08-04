/**
 *  AgreementFundsSourceDto
 */
import {MultiselectItem} from '../../shared/component/multiselect-list/multiselect-list.component';
import {JsonIgnore, JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class AgreementsFundsSource implements MultiselectItem<AgreementsFundsSource> {

  @JsonProperty()
  id: number = null;

  @JsonProperty()
  name: string = null;

  @JsonProperty({required: false})
  typeId: number = null;

  @JsonProperty({required: false})
  typeName: string = null;

  // beginning of multiselect-item interface

  @JsonIgnore()
  checked: boolean = false;

  get label(): string {
    return this.name;
  }
  get value(): AgreementsFundsSource {
    return this;
  }

  // end of multiselect-item interface

  constructor(id: number, name: string, checked: boolean = false) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }

}

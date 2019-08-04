import {IdName} from './id-name';
import {JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class IdNameCode extends IdName {
  @JsonProperty()
  code: string = null;
}

import {JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class IdName {

  @JsonProperty()
  id: number = null;

  @JsonProperty()
  name: string = null;

  actual: boolean = null;
}

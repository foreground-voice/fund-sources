import {JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class Customer {

  @JsonProperty()
  id: number = null;

  @JsonProperty()
  organizationFullName: string = null;

  @JsonProperty()
  organizationInn: string = null;

  @JsonProperty()
  organizationKpp: string = null;

  @JsonProperty()
  organizationShortName: string = null;

  @JsonProperty()
  organizationSpz: string = null;

  @JsonProperty()
  organizationSvr: string = null;

  @JsonProperty()
  timeZoneAbbrev: string = null;

  version: string = null;

}

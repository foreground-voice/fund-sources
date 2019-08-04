import {JsonProperty} from '../../rest/mapper/index';
import {PseudoEnumSerializerDeserializer} from '../../rest/serilizators/pseudo-enum-serializer-deserializer';
import {AgreementsSearchCriteriaDto} from './agreements-search-criteria-dto';
import {Stage} from '../stage';
import {Status} from '../status';

export class AgreementSearchRequestDto {

  @JsonProperty({type: Stage, serializer: PseudoEnumSerializerDeserializer, deserializer: PseudoEnumSerializerDeserializer})
  stage: Stage;

  @JsonProperty({type: Status, serializer: PseudoEnumSerializerDeserializer, deserializer: PseudoEnumSerializerDeserializer})
  status: Status;

  @JsonProperty({type: AgreementsSearchCriteriaDto})
  criteria: AgreementsSearchCriteriaDto;

  constructor(criteria: AgreementsSearchCriteriaDto = new AgreementsSearchCriteriaDto(), stage: Stage = null, status: Status = null) {
    this.stage = stage;
    this.criteria = criteria;
    this.status = status;
  }
}

import {MultiselectItem} from '../../component/multiselect-list/multiselect-list.component';
import {JsonIgnore, JsonProperty} from '../../rest/mapper/DecoratorMetadata';
import {DateTimeSerializerDeserializer} from '../../rest/serilizators/date-time-serializer-deserializer';
import {AuctionSubject} from '../auction-subject';
import {ServiceType} from '../service-type';
import {AgreementsFundsSource} from '../agreements-funds-source';
import {Stage} from '../stage';
import {AgreementSearchDocumentType} from './agreement-search-document-type';
import {PseudoEnumSerializerDeserializer} from '../../rest/serilizators/pseudo-enum-serializer-deserializer';

export class AgreementsSearchCriteriaDto {

  reestrNumber: string = null;

  agreementNumber: string = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  agreementDateFrom: Date = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  agreementDateTo: Date = null;

  priceFrom: number = null;

  priceTo: number = null;

  @JsonProperty({type: AuctionSubject})
  eAuctionSubjects: AuctionSubject[] = [];

  @JsonProperty({type: ServiceType})
  agreementWorkTypes: ServiceType[] = [];

  @JsonProperty({type: AgreementsFundsSource})
  agreementsFundsSourceTypes: AgreementsFundsSource[] = [];

  @JsonIgnore()
  stagesCollection: MultiselectItem<Stage>[] = [];

  @JsonProperty()
  public get stages(): string[] {
    return this.stagesCollection.filter(stage => stage.checked).map(stage => {
      return stage.value.alias;
    });
  }

  // @JsonProperty() -- already applied to both accessors
  // read more: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#accessor-decorators
  public set stages(values: string[]) {
    this.stagesCollection = values.map(value => {
      const stage: Stage = Stage.byAlias(value);
      return {label: stage.name, value: stage, checked: true};
    });
  }

  /**
   * Наименование организации заказчика
   */
  @JsonProperty()
  customerOrganizationFullName: string = null;

  /**
   * ИНН организации заказчика
   */
  @JsonProperty()
  customerOrganizationInn: string = null;

  /**
   * Тип документа
   */
  @JsonProperty({type: AgreementSearchDocumentType, serializer: PseudoEnumSerializerDeserializer, deserializer: PseudoEnumSerializerDeserializer})
  documentType: AgreementSearchDocumentType = null;

  constructor(stagesCollection?: MultiselectItem<Stage>[]) {
    if (stagesCollection) {
      this.stagesCollection = stagesCollection;
    }
  }
}


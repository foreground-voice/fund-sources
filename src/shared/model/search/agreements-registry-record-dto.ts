import {DateTimeSerializerDeserializer} from '../../rest/serilizators/date-time-serializer-deserializer';
import {JsonProperty} from '../../rest/mapper/DecoratorMetadata';
import {Status} from '../status';
import {Stage} from '../stage';
import {AgreementSearchDocumentType} from './agreement-search-document-type';
import {PseudoEnumSerializerDeserializer} from '../../rest/serilizators/pseudo-enum-serializer-deserializer';
import {ContextMenuAgreement} from '../context-menu-agreement';


export class AgreementsRegistryRecordDto implements ContextMenuAgreement {

  /**
   * id договора
   */
  @JsonProperty()
  agreementId: number = null;

  /**
   * id информации о договоре
   */
  @JsonProperty()
  agreementInfoId: number = null;

  /**
   * Номер реестровой записи
   */
  @JsonProperty()
  reestrNumber: string = null;

  /**
   * Номер договора
   */
  @JsonProperty()
  agreementNumber: string = null;

  /**
   * Источники финансирования
   */
  @JsonProperty()
  agreementsFundsSources: string[] = [];

  get agreementNumberAndFunds(): object {
    return {agreementNumber: this.agreementNumber, agreementsFundsSourceTypes: this.agreementsFundsSources};
  }

  /**
   * Дата заключения договора
   */
  @JsonProperty({type: Date, deserializer: DateTimeSerializerDeserializer})
  agreementDate: Date = null;

  /**
   * Дата окончания срока исполнения договора
   */
  @JsonProperty({type: Date, deserializer: DateTimeSerializerDeserializer})
  dateEndExecution: Date = null;

  /**
   * Номер электронного аукциона
   */
  @JsonProperty()
  electronicAuctionNumber: string = null;

  /**
   * Предмет электронного аукциона
   */
  @JsonProperty()
  eAuctionSubjectName: string = null;

  get eAuctionNumberAndSubject(): object {
    return {electronicAuctionNumber: this.electronicAuctionNumber, eAuctionSubjectName: this.eAuctionSubjectName};
  }

  /**
   * Цена договора - сумма в рублях
   */
  @JsonProperty()
  price: number = null;

  /**
   * Этап договора
   */
  @JsonProperty()
  status: string = null;

  get statusName() {
    return Status.byAlias(this.status).name;
  }

  @JsonProperty()
  stage: string = null;

  get stageName() {
    return Stage.byAlias(this.stage).name;
  }

  /**
   * Дата размещения
   */
  @JsonProperty({type: Date, deserializer: DateTimeSerializerDeserializer})
  publishDate: Date = null;

  /**
   * Дата последнего события
   */
  @JsonProperty({type: Date, deserializer: DateTimeSerializerDeserializer})
  lastEventDate: Date = null;

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
   * ИНН организации заказчика
   */
  @JsonProperty()
  customerOrganizationKpp: string = null;

  /**
   * Тип документа
   */
  @JsonProperty({type: AgreementSearchDocumentType, deserializer: PseudoEnumSerializerDeserializer})
  documentType: AgreementSearchDocumentType = null;

  /**
   * Содержит ли договор(реестровая запись) хотя бы один документ(информацию о договоре/изменении договора), который был размещен в реестре договоров не позже, чем за неделю до
   * текущей даты
   */
  @JsonProperty()
  hasPublishedDocsBeforeLastWeek: boolean = false;

  constructor() {

  }
}

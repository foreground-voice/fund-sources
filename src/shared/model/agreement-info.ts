import {AgreementsPhase} from './agreements-phase';
import {AgreementsFundsSource} from './agreements-funds-source';
import {Attachment} from './attachment';
import {Subcontractor} from './subcontractor';
import {Customer} from './customer';
import {JsonIgnore, JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';
import {Stage} from './stage';
import {Status} from './status';
import {PseudoEnumSerializerDeserializer} from '../../shared/rest/serilizators/pseudo-enum-serializer-deserializer';
import {DateTimeSerializerDeserializer} from '../../shared/rest/serilizators/date-time-serializer-deserializer';
import {ValidationResult} from './validation-result';
import {Agreement} from './agreement';
import {ContextMenuAgreement} from './context-menu-agreement';

/**
 * может представлять из себя также AgreementInfoFundsSourcesDto
 */
export class AgreementInfo implements ContextMenuAgreement {

  /**
   *  AgreementInfoDto properties below
   */

  @JsonProperty()
  id: number = null;

  get agreementInfoId() {
    return this.id;
  }

  set agreementInfoId(value: number) {
    this.id = value;
  }

  /**
   * Ссылка на договор
   */
  @JsonProperty()
  agreement: Agreement = null;

  /**
   * Дата заключения договора
   */
  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  agreementDate: Date = null;

  /**
   * Номер договора
   */
  @JsonProperty()
  agreementNumber: string = null;

  /**
   * Номер реестровой записи реестра банковских гарантий
   */
  @JsonProperty()
  bgRegistryNumber: string = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  createDate: Date = null;

  /**
   * Дата начала исполнения договора
   */
  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateBeginExecution: Date = null;

  /**
   * Дата документа, подтверждающего основания заключения договора
   */
  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateDocumentConfirmation: Date = null;

  /**
   * Дата окончания исполнения договора
   */
  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateEndExecution: Date = null;

  /**
   * Дата подведения результатов электронного аукциона
   */
  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateResult: Date = null;

  @JsonProperty()
  descMdfConditions: string = null;

  @JsonProperty()
  eAuctionSubjectId: number = null;

  /**
   * Предмет электронного аукциона
   */
  @JsonProperty()
  eAuctionSubjectName: string = null;

  /**
   * Номер редакции
   */
  @JsonProperty()
  editionNumber: number = null;

  /**
   * Номер извещения электронного аукциона
   */
  @JsonProperty()
  electronicAuctionNumber: string = null;

  @JsonProperty()
  ensureType: string = null;

  @JsonProperty()
  isElectronicAuction: boolean = false;

  @JsonProperty()
  isEnsureFilled: boolean = false;

  @JsonProperty()
  isMultiPhase: boolean = false;

  @JsonProperty()
  isPlanPayment: boolean = false;

  /**
   * Обоснование внесения изменений в договор
   */
  @JsonProperty()
  modificationGround: string = null;

  /**
   * Наименование документа, подтверждающего основания заключения договора
   */
  @JsonProperty()
  nameDocumentConfirmation: string = null;

  /**
   * Номер документа, подтверждающего основания заключения договора
   */
  @JsonProperty()
  numberDocumentConfirmation: string = null;

  /**
   * Цена договора
   */
  @JsonProperty()
  price: number = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  publishDate: Date = null;

  /**
   * Номер реестровой записи
   */
  @JsonProperty()
  reestrNumberDoc: string = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  requestPublishDate: Date = null;

  @JsonIgnore()
  status: string = null;

  @JsonProperty({name: 'status', type: Status, serializer: PseudoEnumSerializerDeserializer, deserializer: PseudoEnumSerializerDeserializer})
  statusEnum: Status = null;

  /**
   * Размер обеспечения исполнения договора
   */
  @JsonProperty()
  sumInRoubles: number = null;

  @JsonProperty()
  termExecution: number = null;

  version: string = null;

  @JsonProperty()
  versionNumber: number = null;

  @JsonProperty()
  agreementId: number = null;

  @JsonProperty()
  agreementsInfoId: number = null;

  @JsonProperty()
  printFormId: number = null;


  /**
   *  AgreementViewCommonInfoDto properties below
   */

  /**
   * Статус договора
   */
  @JsonProperty({type: Stage, serializer: PseudoEnumSerializerDeserializer, deserializer: PseudoEnumSerializerDeserializer, required: false})
  stage: Stage = null;

  /**
   * Информация о заказчике
   */
  @JsonProperty({required: false})
  agreementsCustomer: Customer = null;

  /**
   * Источники финансирования
   */
  @JsonProperty({type: AgreementsFundsSource})
  agreementsFundsSources: AgreementsFundsSource[] = [];

  /**
   * Информация о подрядчике
   */
  @JsonProperty({required: false})
  agreementsSubcontractor: Subcontractor = null;

  validationResults: ValidationResult[] = [];

  /**
   *  non-view properties below
   */

  /**
   * fund-source tab exta information
   */
  @JsonProperty({type: AgreementsPhase, required: false})
  agreementsPhases: AgreementsPhase[] = [];


  availableEAuctionSubjects: any[] = [];
  agreementsWorkTypes: any[] = [];
  agreementsSubjects: any[] = [];
  // parent: AgreementsInfo;
  // printForm: PrintForm;
  // agreementsProtokols: AgreementsProtokol[];
  attachments: Attachment[] = [];
}



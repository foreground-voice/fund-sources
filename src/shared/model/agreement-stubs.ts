import {AgreementInfo} from './agreement-info';
import {Customer} from './customer';

export const NEW_AGREEMENT_STUB: AgreementInfo = <AgreementInfo>{
  id: null,
  agreementDate: null,
  agreementNumber: '',
  bgRegistryNumber: '',
  createDate: new Date(),
  dateBeginExecution: null,
  dateDocumentConfirmation: null,
  dateEndExecution: null,
  dateResult: null,
  descMdfConditions: null,
  eAuctionSubjectId: null,
  eAuctionSubjectName: null,
  availableEAuctionSubjects: null,
  agreementsWorkTypes: null,
  agreementsSubjects: null,
  editionNumber: null,
  electronicAuctionNumber: null,
  ensureType: '',
  isElectronicAuction: true,
  isEnsureFilled: false,
  isMultiPhase: false,
  isPlanPayment: false,
  modificationGround: null,
  nameDocumentConfirmation: null,
  numberDocumentConfirmation: null,
  price: 0,
  publishDate: null,
  reestrNumberDoc: null,
  requestPublishDate: null,
  status: null,
  sumInRoubles: 0,
  termExecution: 90,
  version: null,
  versionNumber: null,
  agreementsFundsSources: [],
// agreement: AgreementInfo,
  agreementsCustomer: new Customer(), // заказчик
// parent: AgreementsInfo,
// printForm: PrintForm,
  agreementsPhases: [],
// agreementsProtokols: AgreementsProtokol[],
  agreementsSubcontractor: null, // подрядчики
// agreementsSubjects: AgreementsSubject[],
  attachments: []
};

export const NEW_AGREEMENT_OVERRIDE: any = {
  isElectronicAuction: true,
  isEnsureFilled: false,
  isMultiPhase: false,
  isPlanPayment: false
};


import {AgreementInfo} from './agreement-info';

export const MOCK_AGREEMENT1: AgreementInfo = <AgreementInfo>{
  id: 2,
  agreementDate: new Date(),

  agreementNumber: '78645/К-6753',

  bgRegistryNumber: 'BGRN-9999',

  createDate: new Date(),
  dateBeginExecution: new Date(),

  dateDocumentConfirmation: null,
  dateEndExecution: new Date(),

  dateResult: null,
  descMdfConditions: null,

  eAuctionSubjectId: null,
  eAuctionSubjectName: null,
  availableEAuctionSubjects: null,
  agreementsWorkTypes: null,
  agreementsSubjects: null,
  editionNumber: null,
  electronicAuctionNumber: 'E876879879237',

  ensureType: '',
  isElectronicAuction: true,
  isEnsureFilled: false,
  isMultiPhase: true,
  isPlanPayment: false,
  modificationGround: null,
  nameDocumentConfirmation: null,
  numberDocumentConfirmation: null,
  price: 452368.55,

  publishDate: null,
  reestrNumberDoc: null,
  requestPublishDate: null,
  status: null,
  sumInRoubles: 99999.99, // в российских рублях

  termExecution: 90,
  version: null,
  versionNumber: null,
  agreementsFundsSources: [],
// agreement: AgreementInfo,
  agreementsCustomer: {
    id: 57986987986,
    organizationFullName: 'Фонд капитального ремонта многоквартирных домов города Москвы',
    organizationInn: '5908006119',
    organizationKpp: '590801001',
    organizationShortName: 'Фонд капремонта г.Москвы',
    organizationSpz: null,
    organizationSvr: null,
    timeZoneAbbrev: null,
    version: ''
  },
// parent: AgreementsInfo,
// printForm: PrintForm,
  agreementsPhases: [],
  //   {
  //     dateBegin: new Date('2017-10-10'),
  //     dateEnd: new Date('2019-10-10'),
  //     agreementsPaymentTerms: [
  //       {
  //         agreementFundSource: {
  //           agreementFundSourceId: 98098723,
  //           fundSourceType: {
  //             id: 1,
  //             name: 'Средства собственников помещений в многоквартирных домах',
  //             actual: true
  //           },
  //           typeName: 'Средства собственников помещений в многоквартирных домах',
  //           name: 'Средства собственников ТСЖ "Мокрый лис"'
  //         },
  //         year: 2017,
  //         sumRub: 78.12
  //       },
  //       {
  //         agreementFundSource: {
  //           agreementFundSourceId: 98098723,
  //           fundSourceType: {
  //             id: 1,
  //             name: 'Средства собственников помещений в многоквартирных домах',
  //             actual: true
  //           },
  //           typeName: 'Средства собственников помещений в многоквартирных домах',
  //           name: 'Средства собственников ТСЖ "Мокрый лис"'
  //         },
  //         year: 2018,
  //         sumRub: 789.00
  //       },
  //       {
  //         agreementFundSource: {
  //           agreementFundSourceId: 6546863513,
  //           fundSourceType: {
  //             id: 3,
  //             name: 'Бюджет субъекта Российской Федерации',
  //             actual: true
  //           },
  //           typeName: 'Бюджет субъекта Российской Федерации',
  //           name: 'Бюджетик бездонненький наш'
  //         },
  //         year: 2017,
  //         sumRub: 455.00
  //       }
  //     ]
  //   },
  //   {
  //     dateBegin: new Date('2019-11-10'),
  //     dateEnd: new Date('2024-10-10'),
  //     agreementsPaymentTerms: []
  //   }
  // ],
// agreementsProtokols: AgreementsProtokol[],
  agreementsSubcontractor: {
    id: 2,
    subcontractorType: 'J',
    rkpoRegisterNumber: '1',
    okopfId: 1,
    okopfName: 'Форма собственности',
    fullName: 'Полное название',
    fullNameEn: 'Full Name',
    shortName: 'Короткое название',
    inn: 'ИНН',
    kpp: 'КПП',
    taxpayerCode: 'taxpayerCode',
    registrationDate: new Date(),
    locationRf: 'Адрес',
    foreignLocation: 'Address',
    countryCode: 1,
    countryName: 'Страна',
    email: 'subcontractor@techinfocom.com',
    name: 'Иван',
    middleName: 'Иванович',
    surname: 'Иванов',
    phoneNum: '+7000000001',
    additionalPhoneNumber: '02'
  },

// agreementsSubjects: AgreementsSubject[],
  attachments: [{
    id: 9876987213,
    contentUid: 'C2E0F4E8-710E-42F3-8805-16743DE6605A',
    attachmentType: 'S',
    createDate: new Date('2024-10-10'),
    description: 'Скан Договор 45Е-345 от 12.03.2017',
    fileName: 'scan1.pdf',
    contentType: 'text/plain',
    fileSize: 7657623,
    publishDate: null,
    status: 'U',
    externalUrl: null,
    cryptoSigns: []
  },
    {
      id: 98798098790,
      contentUid: 'E1E4629E-6BB3-499E-90EE-1283F2247506',
      attachmentType: 'S',
      createDate: new Date('2024-10-10'),
      description: 'Скан Приложение 1 к договору 45Е-345 от 12.03.2017',
      fileName: 'scan2.pdf',
      contentType: 'text/plain',
      fileSize: 7657623,
      publishDate: null,
      status: 'U',
      externalUrl: null,
      cryptoSigns: []
    },
    {
      id: 567456745,
      contentUid: '791DA097-3093-49F5-8381-E512678A1107',
      attachmentType: 'D',
      createDate: new Date('2024-10-10'),
      description: 'Соглашение о намерениях',
      fileName: 'doc1.pdf',
      contentType: 'text/plain',
      fileSize: 7657623,
      publishDate: null,
      status: 'U',
      externalUrl: null,
      cryptoSigns: []
    },
    {
      id: 786567234,
      contentUid: '2560D88B-7CBB-4F84-BD1D-4E61E848C74D',
      attachmentType: 'D',
      createDate: new Date('2024-10-10'),
      description: 'Заявление в спортлото',
      fileName: 'doc2.pdf',
      contentType: 'text/plain',
      fileSize: 7657623,
      publishDate: null,
      status: 'U',
      externalUrl: null,
      cryptoSigns: []
    }
  ]

};

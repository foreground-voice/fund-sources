import {async, inject, TestBed} from '@angular/core/testing';

import {AgreementSearchService} from './agreement-search.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AgreementsSearchCriteriaDicsDto} from '../../shared/model/search/agreements-search-criteria-dics-dto';
import {JsonConverstionError, ObjectMapper} from '../../shared/rest/mapper';
import {AgreementsRegistryRecordDto} from '../../shared/model/search/agreements-registry-record-dto';
import {DateTimeSerializerDeserializer} from '../../shared/rest/serilizators/date-time-serializer-deserializer';
import {AgreementsContextMenuItem} from '../../shared/model/agreements-context-menu-item';
import {Logger} from 'angular2-logger/core';
import {AgreementSearchRequestDto} from '../../shared/model/search/agreement-search-request-dto';
import {AgreementSearchResultDto, ResultsCountsByStage} from './dto/agreement-search-result-dto';
import {AuctionSubject} from '../../shared/model/auction-subject';
import {AgreementsFundsSource} from '../../shared/model/agreements-funds-source';
import {ServiceType} from '../../shared/model/service-type';
import {Stage} from '../../shared/model/stage';

// declare var Reflect;

describe('AgreementSearchService', () => {

  // @formatter:off

  // curl -X GET 'http://localhost:9080/44fz/rd/api/agreement/search' -H 'Accept: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
  const AGREEMENTS_SEARCH_CRITERIA_DICS_DTO: object  = JSON.parse('{"eAuctionSubjects":[{"id":1,"name":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов"},{"id":2,"name":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов, являющихся объектами культурного наследия, выявленными объектами культурного наследия"},{"id":3,"name":"Выполнение работ и (или) оказание услуг по ремонту или замене лифтового оборудования, признанного непригодным для эксплуатации, ремонт лифтовых шахт (ремонт (замена) лифтов)"},{"id":4,"name":"Выполнение работ и (или) оказание услуг по оценке технического состояния,  разработке проектной документации на проведение капитального ремонта общего имущества многоквартирных домов, в том числе по ремонту (замене) лифтов"},{"id":5,"name":"Выполнение работ и (или) оказание услуг по оценке технического состояния и разработке проектной документации на проведение капитального ремонта общего имущества многоквартирных домов, являющихся объектами культурного наследия, выявленными объектами культурного наследия, в том числе по ремонту (замене) лифтов"},{"id":6,"name":"Выполнение работ и (или) оказание услуг по оценке соответствия лифтов требованиям технического регламента Таможенного союза 011/2011 \\"Безопасность лифтов\\" (ТР ТС 011/2011), утвержденного решением Комиссии Таможенного союза от 18 октября 2011 г. N 824 \\"О принятии технического регламента Таможенного союза \\"Безопасность лифтов\\" (технический регламент)"},{"id":7,"name":"Оказание услуг по осуществлению строительного контроля"},{"id":8,"name":"Выполнение работ и (или) оказание услуг по оценке технического состояния,  разработке проектной документации на проведение капитального ремонта общего имущества многоквартирных домов и выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов"},{"id":9,"name":"Выполнение работ и (или) оказание услуг по оценке технического состояния,  разработке проектной документации по ремонту (замене) лифтов и выполнение работ и (или) оказание услуг по ремонту (замене) лифтов)"}],"agreementsFundsSourceTypes":[{"id":1,"name":"Средства собственников помещений в многоквартирных домах"},{"id":2,"name":"Бюджет муниципального образования"},{"id":3,"name":"Бюджет субъекта Российской Федерации"},{"id":4,"name":"Иной источник финансирования"}]}');

  // curl -X POST 'http://localhost:9080/44fz/rd/api/nsi/worktypes' --data '{"eAuctionSubjectIds": [1, 2]}' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
  const AGREEMENTS_NSI_WORKTYPES_ARRAY: object[] = JSON.parse('[{"id":1,"name":"Ремонт внутридомовых инженерных систем электроснабжения"},{"id":2,"name":"Ремонт внутридомовых инженерных систем теплоснабжения"},{"id":3,"name":"Ремонт внутридомовых инженерных систем газоснабжения"},{"id":4,"name":"Ремонт внутридомовых инженерных систем водоснабжения"},{"id":5,"name":"Ремонт внутридомовых инженерных систем водоотведения"},{"id":6,"name":"Ремонт или замену лифтового оборудования, признанного непригодным для эксплуатации, ремонт лифтовых шахт"},{"id":7,"name":"Ремонт крыши"},{"id":8,"name":"Ремонт подвальных помещений, относящихся к общему имуществу в многоквартирном доме"},{"id":9,"name":"Ремонт фасада"},{"id":14,"name":"Установка коллективных (общедомовых) приборов учета потребления ресурсов, необходимых для предоставления коммунальных услуг, и узлов управления и регулирования потребления этих ресурсов (тепловой энергии, горячей и холодной воды, электрической энергии, газа)"},{"id":10,"name":"Ремонт фундамента многоквартирного дома"},{"id":11,"name":"Утепление фасада"},{"id":12,"name":"Переустройство невентилируемой крыши на вентилируемую крышу"},{"id":13,"name":"Устройство выходов на кровлю"}]');

  // curl -X POST 'http://localhost:9080/44fz/rd/api/agreement/search' --data '{"stage":null,"criteria":{"reestrNumber":null,"agreementNumber":null,"agreementDateFrom":null,"agreementDateTo":null,"priceFrom":null,"priceTo":null,"eAuctionSubjects":[{"id":1,"name":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов"},{"id":2,"name":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов, являющихся объектами культурного наследия, выявленными объектами культурного наследия"}],"agreementWorkTypes":[{"name":"Ремонт внутридомовых инженерных систем электроснабжения","id":1}],"agreementsFundsSourceTypes":[],"stages":["PR","E"]}}' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
  const AGREEMENT_SEARCH_RESULT_DTO = JSON.parse('{"resultsForSelectedStage":[{"agreementId":41,"agreementInfoId":41,"reestrNumber":null,"agreementNumber":"123-321","agreementsFundsSources":["Бюджет 1","Бюджет 2"],"agreementDate":"2017-12-12T22:00:00+0300","dateEndExecution":"2018-03-02T22:00:00+0300","electronicAuctionNumber":null,"eAuctionSubjectName":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов","price":123123123,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null}],"totalResultsCount":{"stagePrCount":1,"stageECount":0,"stageETCount":0,"stageECCount":0,"allStagesCount":1}}');

  // there are no request
  const AGREEMENTS_SEARCH_REGISTRY_ARRAY: object[] = JSON.parse('[{"agreementId":2,"agreementInfoId":2,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":["asdfasdf"],"agreementDate":"2017-12-04T22:00:00+0300","dateEndExecution":"2018-03-31T22:00:00+0300","electronicAuctionNumber":"65213897323NN","eAuctionSubjectName":"Оказание услуг по осуществлению строительного контроля","price":34343444,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":84,"agreementInfoId":84,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":3,"agreementInfoId":3,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":0,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":81,"agreementInfoId":81,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":"2017-12-06T22:00:00+0300","dateEndExecution":null,"electronicAuctionNumber":"454645","eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":83,"agreementInfoId":83,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":4,"agreementInfoId":4,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":["dsddds"],"agreementDate":"2017-12-12T22:00:00+0300","dateEndExecution":null,"electronicAuctionNumber":"65213897323NN","eAuctionSubjectName":null,"price":0,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":61,"agreementInfoId":61,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":"2017-12-07T22:00:00+0300","dateEndExecution":null,"electronicAuctionNumber":"AAAAAAAAAAAA","eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":1,"agreementInfoId":1,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":"2017-12-07T22:00:00+0300","dateEndExecution":"2017-12-08T22:00:00+0300","electronicAuctionNumber":"65213897323NN","eAuctionSubjectName":null,"price":0,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":57,"agreementInfoId":57,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":["asdewwewee","asdewwewee"],"agreementDate":"2017-12-12T22:00:00+0300","dateEndExecution":"2018-03-02T22:00:00+0300","electronicAuctionNumber":null,"eAuctionSubjectName":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов","price":121,"status":"P","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":85,"agreementInfoId":85,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null,null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":82,"agreementInfoId":82,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null},{"agreementId":86,"agreementInfoId":86,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":[null],"agreementDate":null,"dateEndExecution":null,"electronicAuctionNumber":null,"eAuctionSubjectName":null,"price":null,"status":"F","stage":"PR","publishDate":null,"lastEventDate":null}]');

  // there are no request
  const AGREEMENTS_SEARCH_ONE_REGISTRY_ARRAY: object[] = JSON.parse('[{"agreementId":57,"agreementInfoId":57,"reestrNumber":null,"agreementNumber":null,"agreementsFundsSources":["asdewwewee","asdewwewee"],"agreementDate":"2017-12-12T22:00:00+0300","dateEndExecution":"2018-03-02T22:00:00+0300","electronicAuctionNumber":null,"eAuctionSubjectName":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов","price":121,"status":"P","stage":"PR","publishDate":null,"lastEventDate":null}]');

  // curl -X GET 'http://localhost:9080/44fz/rd/api/agreement/search/getContextMenu?agreementsInfoId=57' -H 'Accept: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache'
  const AGREEMENTS_CONTEXT_MENU_ITEMS: string[] = JSON.parse('["CARD_DOCUMENT","EDIT","REMOVE","GO_TO_PUBLIC","EVENT_JOURNAL","PRINTED_FORM"]');

  // @formatter:on

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        Logger,
        AgreementSearchService
      ]
    });
  });


  it('should be created', inject([AgreementSearchService], (service: AgreementSearchService) => {
    expect(service).toBeTruthy();
  }));


  it('deserialization/serialization of AgreementsSearchCriteriaDicsDto', () => {
    try {
      console.log('agreements search dicts source: {}');
      try {
        ObjectMapper.deserialize(AgreementsSearchCriteriaDicsDto, {});
        fail('the statement above must fail');
      } catch (err) {
        console.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }

      console.log('agreements search dicts source: ' + JSON.stringify(AGREEMENTS_SEARCH_CRITERIA_DICS_DTO));
      const agreementsSearchCriteriaDictsDto: AgreementsSearchCriteriaDicsDto = ObjectMapper.deserialize(AgreementsSearchCriteriaDicsDto, AGREEMENTS_SEARCH_CRITERIA_DICS_DTO);
      console.log('agreements search dicts deserialized: ' + JSON.stringify(agreementsSearchCriteriaDictsDto));

      expect(agreementsSearchCriteriaDictsDto instanceof AgreementsSearchCriteriaDicsDto).toBeTruthy();
      expect(agreementsSearchCriteriaDictsDto.eAuctionSubjects[0] instanceof AuctionSubject).toBeTruthy();
      expect(agreementsSearchCriteriaDictsDto.eAuctionSubjects).toContain(jasmine.objectContaining(<AuctionSubject>{
        id: 1,
        name: 'Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов',
        checked: false
      }));
      expect(agreementsSearchCriteriaDictsDto.agreementsFundsSourceTypes[0] instanceof AgreementsFundsSource);
      expect(agreementsSearchCriteriaDictsDto.agreementsFundsSourceTypes).toContain(jasmine.objectContaining(<AgreementsFundsSource>{
        id: 1,
        name: 'Средства собственников помещений в многоквартирных домах',
        checked: false
      }));
    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('deserialization/serialization of ServiceType[]', () => {
    try {
      console.log('source: {}');
      try {
        ObjectMapper.deserializeArray(ServiceType, {});
        fail('the statement above must fail');
      } catch (err) {
        console.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }

      console.log('source: ' + JSON.stringify(AGREEMENTS_NSI_WORKTYPES_ARRAY));
      const agreementWorkTypes: ServiceType[] = ObjectMapper.deserializeArray(ServiceType, AGREEMENTS_NSI_WORKTYPES_ARRAY);
      console.log('deserialized: ' + JSON.stringify(agreementWorkTypes));

      expect(agreementWorkTypes instanceof Array).toBeTruthy();
      expect(agreementWorkTypes[0] instanceof ServiceType).toBeTruthy();
      expect(agreementWorkTypes).toContain(jasmine.objectContaining(<ServiceType>{
        id: 1,
        name: 'Ремонт внутридомовых инженерных систем электроснабжения',
        checked: false
      }));
    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('deserialization/serialization of AgreementSearchRequestDto', () => {
    try {
      // let objectKeys: string[] = Object.keys(dto);
      // objectKeys = objectKeys.concat(
      //   (Reflect.getMetadata(METADATA_JSON_PROPERTIES_NAME, dto) || []).filter((item: string) => {
      //     console.log('item=' + item);
      //     if (dto.constructor.prototype.hasOwnProperty(item) && Object.getOwnPropertyDescriptor(dto.constructor.prototype, item).get === undefined) {
      //       // Property does not have getter
      //       return false;
      //     }
      //     return objectKeys.indexOf(item) < 0;
      //   }),
      //   (Object.keys(dto.constructor.prototype) || []).filter((item: string) => {
      //     return Reflect.hasMetadata(JSON_PROPERTY_DECORATOR_NAME, dto, item);
      //     // const metadata: JsonPropertyDecoratorMetadata = getJsonPropertyDecoratorMetadata(dto.constructor.prototype, item);
      //     // return metadata !== undefined && objectKeys.indexOf(item) < 0;
      //   }));
      // console.log(objectKeys);
      {
        const dto: AgreementSearchRequestDto = new AgreementSearchRequestDto();
        console.log('source dto (native): ' + JSON.stringify(dto));
        const serialized = ObjectMapper.serialize(dto);
        console.log('serialized dto: ' + serialized);
        const nativeDeserialized: AgreementSearchRequestDto = JSON.parse(<string>serialized);

        expect(nativeDeserialized.criteria.stages !== undefined).toBeTruthy();
        expect(nativeDeserialized.criteria.stages.length).toBeGreaterThan(0);
      }
      {
        const dto: AgreementSearchRequestDto = new AgreementSearchRequestDto();
        dto.criteria.agreementWorkTypes = [new ServiceType(1, 'name1')];
        dto.criteria.eAuctionSubjects = [new AuctionSubject(1, 'name1')];
        dto.criteria.agreementsFundsSourceTypes = [new AgreementsFundsSource(1, 'name1')];
        dto.criteria.stages = [Stage.COMPLETED.alias];
        dto.criteria.priceFrom = 1;
        dto.criteria.priceTo = 1;
        dto.criteria.agreementNumber = '222';
        dto.criteria.reestrNumber = '333';
        dto.criteria.agreementDateFrom = DateTimeSerializerDeserializer.deserializeTo('2017-12-11T19:29:00+0500');
        dto.criteria.agreementDateTo = DateTimeSerializerDeserializer.deserializeTo('2017-12-11T19:29:00+0500');
        dto.stage = Stage.RUNING;
        console.log('source dto (native): ' + JSON.stringify(dto));
        const serialized: String = ObjectMapper.serialize(dto);
        console.log('serialized dto: ' + serialized);

        const deserialized: AgreementSearchRequestDto = ObjectMapper.deserialize(AgreementSearchRequestDto, JSON.parse(<string>serialized));
        console.log('deserialized dto (native): ' + JSON.stringify(deserialized));
        // expect(deserialized).toEqual(jasmine.objectContaining(dto));
      }

    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('deserialization of AgreementSearchResultDto', () => {
    try {
      console.log('source: {}');
      try {
        ObjectMapper.deserializeArray(AgreementSearchResultDto, {});
        fail('the statement above must fail');
      } catch (err) {
        console.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }

      console.log('source: ' + JSON.stringify(AGREEMENT_SEARCH_RESULT_DTO));
      const dto: AgreementSearchResultDto = ObjectMapper.deserialize(AgreementSearchResultDto, AGREEMENT_SEARCH_RESULT_DTO);
      console.log('deserialized: ' + JSON.stringify(dto));

      expect(dto instanceof AgreementSearchResultDto).toBeTruthy();
      expect(dto.resultsForSelectedStage[0] instanceof AgreementsRegistryRecordDto).toBeTruthy();
      expect(dto.totalResultsCount instanceof ResultsCountsByStage).toBeTruthy();

    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('deserialization/serialization of AgreementsRegistryRecordDto[]', () => {
    try {
      console.log('source: {}');
      try {
        ObjectMapper.deserializeArray(AgreementsRegistryRecordDto, {});
        fail('the statement above must fail');
      } catch (err) {
        console.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }

      {
        console.log('test response with many records');
        console.log('source: ' + JSON.stringify(AGREEMENTS_SEARCH_REGISTRY_ARRAY));
        const agreementsRegistryRecords: AgreementsRegistryRecordDto[] = ObjectMapper.deserializeArray(AgreementsRegistryRecordDto, AGREEMENTS_SEARCH_REGISTRY_ARRAY);
        console.log('deserialized: ' + JSON.stringify(agreementsRegistryRecords));

        expect(agreementsRegistryRecords instanceof Array).toBeTruthy();
        expect(agreementsRegistryRecords[0] instanceof AgreementsRegistryRecordDto).toBeTruthy();

        const dto: AgreementsRegistryRecordDto = new AgreementsRegistryRecordDto();
        dto.agreementId = 2;
        dto.agreementInfoId = 2;
        dto.agreementsFundsSources = ['asdfasdf'];
        dto.agreementDate = DateTimeSerializerDeserializer.deserializeTo('2017-12-04T22:00:00+0300');
        dto.dateEndExecution = DateTimeSerializerDeserializer.deserializeTo('2018-03-31T22:00:00+0300');
        dto.electronicAuctionNumber = '65213897323NN';
        dto.eAuctionSubjectName = 'Оказание услуг по осуществлению строительного контроля';
        dto.price = 34343444;
        dto.status = 'F';
        dto.stage = 'PR';
        expect(agreementsRegistryRecords).toContain(dto);
      }

      {
        console.log('test response with one record');
        console.log('source: ' + JSON.stringify(AGREEMENTS_SEARCH_ONE_REGISTRY_ARRAY));
        const agreementsRegistryRecords: AgreementsRegistryRecordDto[] = ObjectMapper.deserializeArray(AgreementsRegistryRecordDto, AGREEMENTS_SEARCH_ONE_REGISTRY_ARRAY);
        console.log('deserialized: ' + JSON.stringify(agreementsRegistryRecords));

        expect(agreementsRegistryRecords instanceof Array).toBeTruthy();
        expect(agreementsRegistryRecords[0] instanceof AgreementsRegistryRecordDto).toBeTruthy();

        const dto: AgreementsRegistryRecordDto = new AgreementsRegistryRecordDto();
        dto.agreementId = 57;
        dto.agreementInfoId = 57;
        dto.agreementsFundsSources = ['asdewwewee', 'asdewwewee'];
        dto.agreementDate = DateTimeSerializerDeserializer.deserializeTo('2017-12-12T22:00:00+0300');
        dto.dateEndExecution = DateTimeSerializerDeserializer.deserializeTo('2018-03-02T22:00:00+0300');
        dto.eAuctionSubjectName = 'Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов';
        dto.price = 121;
        dto.status = 'P';
        dto.stage = 'PR';
        expect(agreementsRegistryRecords).toContain(dto);
      }
    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('deserialization/serialization of AgreementsContextMenuItem[]', () => {
    try {
      console.log('source: {}');
      try {
        ObjectMapper.deserializePseudoEnums(AgreementsContextMenuItem, ['something wrong here']);
        fail('the statement above must fail');
      } catch (err) {
        console.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }

      console.log('source: ' + JSON.stringify(AGREEMENTS_CONTEXT_MENU_ITEMS));
      const agreementCMenuItems: AgreementsContextMenuItem[] = ObjectMapper.deserializePseudoEnums(AgreementsContextMenuItem, AGREEMENTS_CONTEXT_MENU_ITEMS);
      console.log('deserialized: ' + JSON.stringify(agreementCMenuItems));

      expect(agreementCMenuItems instanceof Array).toBeTruthy();
      expect(agreementCMenuItems[0] instanceof AgreementsContextMenuItem).toBeTruthy();
      expect(agreementCMenuItems).toContain(AgreementsContextMenuItem.CARD_DOCUMENT);
    } catch (err) {
      console.log('An unexpected error occurred');
      fail(err);
    }
  });


  it('getCriteriasDics(): test default and custom handlers and data consistency',
    async(inject([AgreementSearchService, HttpTestingController], (service: AgreementSearchService, backend: HttpTestingController) => {

    console.log('started');
    service.handleConnectionError = (err) => {
      console.log('failed');
      fail(err);
    };
    service.loadingFinish = () => {
      console.log('finished');
    };
    service.getCriteriasDics().subscribe(value => {
      console.log('received: ' + JSON.stringify(value));
      expect(value instanceof AgreementsSearchCriteriaDicsDto).toBeTruthy();
      expect(value.eAuctionSubjects.length).toBeGreaterThan(0);
      expect(value.agreementsFundsSourceTypes.length).toBeGreaterThan(0);
    }, (err) => {
      console.log('custom failed: ' + err);
    }, () => {
      console.log('custom finished');
    });

    backend.expectOne({ method: 'GET' }).flush(AGREEMENTS_SEARCH_CRITERIA_DICS_DTO);
    backend.verify();
  })));


  it('getCriteriasDics(): test just custom handlers and fail',
    async(inject([AgreementSearchService, HttpTestingController], (service: AgreementSearchService, backend: HttpTestingController) => {

      console.log('started');
      service.getCriteriasDics().subscribe(value => {
        fail('must fail on invalid data, but isn\'t');
      }, (err) => {
        console.log('custom failed');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });

      backend.expectOne({ method: 'GET' }).flush({});
      backend.verify();
    })));


  it('getWorktypesByAuctionSubjects(): test default and custom handlers and data consistency',
    async(inject([AgreementSearchService, HttpTestingController], (service: AgreementSearchService, backend: HttpTestingController) => {

      console.log('started');
      service.getWorktypesByAuctionSubjects([1, 2]).subscribe(agreementWorkTypes => {
        console.log('received: ' + JSON.stringify(agreementWorkTypes));
        expect(agreementWorkTypes instanceof Array).toBeTruthy();
        expect(agreementWorkTypes.length).toBeGreaterThan(0);
        expect(agreementWorkTypes[0] instanceof ServiceType).toBeTruthy();
      }, (err) => {
        console.log('custom failed: ' + err);
        fail(err);
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'POST' }).flush(AGREEMENTS_NSI_WORKTYPES_ARRAY);

      console.log('started');
      service.getWorktypesByAuctionSubjects([1, 2]).subscribe(value => {
        fail('must fail on invalid data, but isn\'t');
      }, (err) => {
        console.log('custom failed');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'POST' }).flush({});

      backend.verify();
    })));


  it('searchAgreements(): test default and custom handlers and data consistency',
    async(inject([AgreementSearchService, HttpTestingController], (service: AgreementSearchService, backend: HttpTestingController) => {

      console.log('started empty request -> result dto response');
      service.searchAgreements(new AgreementSearchRequestDto()).subscribe(agreementSearchResult => {
        console.log('received: ' + JSON.stringify(agreementSearchResult));
        expect(agreementSearchResult instanceof AgreementSearchResultDto).toBeTruthy();
        expect(agreementSearchResult.resultsForSelectedStage.length).toBeGreaterThan(0);
        expect(agreementSearchResult.resultsForSelectedStage[0] instanceof AgreementsRegistryRecordDto).toBeTruthy();
        expect(agreementSearchResult.totalResultsCount instanceof ResultsCountsByStage).toBeTruthy();
      }, (err) => {
        console.log('custom failed: ' + err);
        fail(err);
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'POST' }).flush(AGREEMENT_SEARCH_RESULT_DTO);
      backend.verify();

      console.log('started fail response test');
      service.searchAgreements(new AgreementSearchRequestDto()).subscribe(value => {
        fail('must fail on invalid data, but isn\'t');
      }, (err) => {
        console.log('custom failed');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'POST' }).flush({});
      backend.verify();
    })));


  it('getContextMenuItems(): test default and custom handlers and data consistency',
    async(inject([AgreementSearchService, HttpTestingController], (service: AgreementSearchService, backend: HttpTestingController) => {

      console.log('started');
      service.getContextMenuItems(57).subscribe(cmItems => {
        console.log('received: ' + JSON.stringify(cmItems));
        expect(cmItems instanceof Array).toBeTruthy();
        expect(cmItems.length).toBeGreaterThan(0);
        expect(cmItems[0] instanceof AgreementsContextMenuItem).toBeTruthy();
      }, (err) => {
        console.log('custom failed: ' + err);
        fail(err);
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).flush(AGREEMENTS_CONTEXT_MENU_ITEMS);

      console.log('started');
      service.getContextMenuItems(57).subscribe(value => {
        fail('must fail on invalid data, but isn\'t');
      }, (err) => {
        console.log('custom failed');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).flush({});

      backend.verify();
    })));
});

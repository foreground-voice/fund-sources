import {async, inject, TestBed} from '@angular/core/testing';

import {AgreementService} from './agreement.service';
import {Level as LoggerLevel, Logger, Options as LoggerOptions} from 'angular2-logger/core';
import {ObjectMapper} from '../rest/mapper/index';
import {AgreementInfo} from '../model/agreement-info';
import {JsonConverstionError} from '../rest/mapper/DecoratorMetadata';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {FailHandleService} from '../rest/errorhandler/fail-handle.service';
import {WebResponse} from '../model/web-response';
import {ValidationResultViewModalService} from '../component/validation-result-view-modal/validation-result-view-modal.service';
import {GrowlService} from '../component/growl/growl.service';
import {Router} from '@angular/router';
import {ResponseStatus} from '../model/response-status.enum';
import {BAD_REQUEST_CODE} from '../rest/options';
import {FundSourceService} from './fund-source.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('FundSourceService', () => {

  // curl -X GET 'http://192.168.1.72:9081/44fz/rd/api/agreement/1/funds-sources' --cookie 'LtpaToken2=Uy5RJlxkHbYx2S47FlEXzVXBAkVaK35vsr0Zj1Vsten7vfZjnVLd/MrCoxYEJSs/QW+qIC47y5l0mnzluLPco20A3L/tOhd95O1tXTpAy1h0FUpzXeoIEySF6uHnHWMZXRr6dQelieH//U+43fSh2Xf7J8wbiYThXIvOWUad8I+x4fuGl6nFjZ3fOwyKbgGqz8R3z8PQnLTCtRoPqJu8TVPRMBNlFA4gLYzDvm029/L2XvyRhvjydCEirs5DpscAAANiP4Ocd/fkQerNkHEz7knv7tdTp0tO3T6bEnhpnCAgC8HxTjqMLRDO5AkHjTtwbSXnMH4rxGdSkNUYi/OMjGGYvOcBAS3jBbhCuvcaZ188llX2PA9GBve8Rt+vXmsaMS1DlqpoHiluk5bg8P/IKvBtgoA2o7/daLf6zVZN3rhA4tsHlDOHzM94yNpx0y9OCnw84s47FW43pS/LqsjmvVCzqdHNzAfPTUlva46SIIujb4+JcktxcDLhNdBFlzd1lV5TbT/7C1/aVJ/LN6aO01KVsSeWBl9Rze50++FJPou3BTeOSzKdwc7CJkt46WRQCJdVO3X+xrtAwwaIkJCiFAilQGSMQsB4mLyfP1FFp1ww10uhhBFT8vJdwfs5tqGWhZJWeKxkeqG73xLYr0GaNw==' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -v
  const AG_FUND_SOURCES_DTO: object = JSON.parse('{"status":"SUCCESS","results":{"agreementInfoFundsSources":{"data":{"validationResults":null,"id":1,"agreementDate":"2017-12-12T22:00:00+0300","agreementNumber":null,"bgRegistryNumber":"876876878hhh","createDate":"2017-12-05T16:00:43+0300","dateBeginExecution":"2017-12-04T22:00:00+0300","dateDocumentConfirmation":"2017-12-06T22:00:00+0300","dateEndExecution":"2018-03-02T22:00:00+0300","dateResult":"2017-12-05T22:00:00+0300","descMdfConditions":null,"eAuctionSubjectId":0,"eAuctionSubjectName":"Выполнение работ и (или) оказание услуг по капитальному ремонту общего имущества многоквартирных домов","editionNumber":1,"electronicAuctionNumber":null,"ensureType":"BG","isElectronicAuction":false,"isEnsureFilled":true,"isMultiPhase":true,"isPlanPayment":false,"modificationGround":null,"nameDocumentConfirmation":"asdfa","numberDocumentConfirmation":"asdf","price":121,"publishDate":null,"reestrNumberDoc":null,"requestPublishDate":null,"status":"P","sumInRoubles":4598989,"termExecution":88,"versionNumber":1,"agreementId":1,"agreementsCustomerId":1,"agreementsInfoId":null,"printFormId":null,"parentId":null,"agreement":{"id":1,"createDate":"2017-12-18T16:34:36+0300","organizationId":123,"reestrNumber":null,"stage":"PR"},"agreementsFundsSources":[{"id":2,"name":"asdewwewee","typeId":3,"typeName":"Бюджет субъекта Российской Федерации"},{"id":1,"name":"asdewwewee","typeId":3,"typeName":"Бюджет субъекта Российской Федерации"}],"agreementsPhases":[{"id":1,"dateBegin":"2017-12-25T22:00:00+0300","dateEnd":"2018-03-02T22:00:00+0300","guid":"B1097F8FF4124BE59F5044CBCA521EDF","agreementsPaymentsTerms":[]},{"id":2,"dateBegin":"2017-12-25T22:00:00+0300","dateEnd":"2018-03-02T22:00:00+0300","guid":"74E7EEE438184AE88873639E468CA02E","agreementsPaymentsTerms":[]}]}}}}');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: LoggerOptions, useValue: { level: LoggerLevel.LOG } },
        Logger,
        {provide: Router, useClass: MockRouter},
        GrowlService,
        ValidationResultViewModalService,
        FailHandleService,
        AgreementService
      ]
    }).compileComponents();
  });


  it('should be created', inject([AgreementService], (service: AgreementService) => {
    expect(service).toBeTruthy();
  }));


  it('deserialization/serialization of AgreementInfo', inject([Logger], (logger: Logger) => {
    try {
      logger.log('agreements view common info source: {}');
      try {
        ObjectMapper.deserialize(WebResponse, {});
        fail('the statement above must fail');
      } catch (err) {
        logger.log('planed fail happened ');
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }
      {
        logger.log('agreements view common info source (native): ' + JSON.stringify((<WebResponse<AgreementInfo>>AG_FUND_SOURCES_DTO).results.agreementInfoFundsSources.data));
        const resp: WebResponse<AgreementInfo> = ObjectMapper.deserialize(WebResponse, AG_FUND_SOURCES_DTO);
        const dto: AgreementInfo = ObjectMapper.deserialize(AgreementInfo, resp.results.agreementInfoFundsSources.data);
        logger.log('agreements view common info deserialized:    ' + JSON.stringify(dto));
        expect(dto instanceof AgreementInfo).toBeTruthy();
      }
    } catch (err) {
      logger.log('An unexpected error occurred');
      fail(err);
    }
  }));


  it('getFundsSource(): test default and custom handlers and data consistency',
    async(inject([Logger, AgreementService, HttpTestingController], (logger: Logger, service: AgreementService, backend: HttpTestingController) => {

      logger.debug('\n start simple request -> result dto response');
      service.getFundsSource(1).subscribe(restResp => {
        console.log('received: ' + JSON.stringify(restResp));
        console.log('received constructor[name]: ' + restResp.constructor['name']);
        console.log('test constructor[name]: ' + WebResponse['name']);
        console.log('test constructors equality: ' + (new WebResponse<AgreementInfo>().constructor === restResp.constructor));

        expect(restResp instanceof WebResponse).toBeTruthy();
        expect(restResp).toEqual(jasmine.objectContaining(/*<WebResponse<AgreementInfo>>*/{
          status: ResponseStatus.SUCCESS,
          // problem: jasmine.anything(),
          // results: jasmine.anything()
        }));
        expect(restResp.results.agreementInfoFundsSources.data instanceof AgreementInfo).toBeTruthy();
      }, (err) => {
        console.log('custom failed: ' + err);
        fail(err);
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).flush(AG_FUND_SOURCES_DTO);
      backend.verify();


      logger.debug('\n start bad-request catch test');
      service.getFundsSource(1, true).subscribe(value => {
        fail('must fail on invalid response, but isn\'t');
      }, (err) => {
        console.log('custom error handler', err);
        expect(err instanceof HttpErrorResponse).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).error(new ErrorEvent('Bad Bad Bad Request'), {status: BAD_REQUEST_CODE, statusText: 'some json-error body here'});
      backend.verify();


      logger.debug('\n start fail response test');
      service.getFundsSource(1).subscribe(value => {
        fail('must fail on invalid data, but isn\'t');
      }, undefined /* можно не указывать обработчик т.к. глобальный все-равно срабатывает */
       , () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).flush({});
      backend.verify();


      logger.debug('\n start fail response test');
      service.getFundsSource(1, true).subscribe(value => {
        fail('must fail on invalid response, but isn\'t');
      }, (err) => {
        console.log('custom error handler', err);
        expect(err instanceof JsonConverstionError).toBeTruthy();
      }, () => {
        console.log('custom finished');
      });
      backend.expectOne({ method: 'GET' }).flush({});
      backend.verify();
    })));
});

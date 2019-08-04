import { AppPage } from './app.po';
import '../src/polyfills';
// import 'zone.js/dist/long-stack-trace-zone';
// import 'zone.js/dist/proxy.js';
// import 'zone.js/dist/sync-test';
// import 'zone.js/dist/jasmine-patch';
// import 'zone.js/dist/async-test';
// import 'zone.js/dist/fake-async-test';
import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('App1', () => {
  let page: AppPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Реестр контрактов');
  });

  it('should be able to test', inject([HttpClient], (http: HttpClient) => {
    console.log('http here is: ' + http);
    http.get('/rd/api/agreement/search').subscribe(data => {
      console.log('data received: ' + JSON.stringify(data));
    });
  }));

  //
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule,
  //       HttpClientTestingModule
  //     ]
  //   });
  // });
  //
  // it('should create', inject([HttpClient, HttpTestingController],
  //   (http: HttpClient, backend: HttpTestingController) => {
  //     // expect(component).toBeTruthy();
  //     const dicts = JSON.parse('{"eAuctionSubjects":[],"agreementWorkTypes":[],"agreementsFundsSources":[{"id":1,"name":null},{"id":2,"name":"asdfasdf"},{"id":3,"name":null},{"id":4,"name":"dsddds"}]}');
  //     // const dictsDto = ObjectMapper.deserialize(AgreementsSearchCriteriaDicsDto, dicts);
  //     console.log('start request.');
  //
  //     http.get('http://192.168.1.71:9080/fake/rd/api/agreement/search')
  //       .subscribe(data => {
  //         console.log('data received: ' + JSON.stringify(data));
  //         this.agreementSearchCriteriaDics = ObjectMapper.deserialize(AgreementsSearchCriteriaDicsDto, data);
  //         console.log('data deserialized: ' + JSON.stringify(this.agreementSearchCriteriaDics));
  //       }, this.handleConnectionError, this.loadingFinish);
  //     const req = backend.expectOne('http://192.168.1.71:9080/fake/rd/api/agreement/search');
  //     req.flush(dicts);
  //     backend.verify();
  //
  //     console.log('finished.');
  //   }));
});

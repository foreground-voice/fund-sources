import {Injectable} from '@angular/core';
import {AgreementsSearchCriteriaDicsDto} from '../../shared/model/search/agreements-search-criteria-dics-dto';
import {HttpClient} from '@angular/common/http';
import {ObjectMapper} from '../../shared/rest/mapper';
import {Observable} from 'rxjs/Observable';

import {map} from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';

import {REST_OPTIONS} from '../../shared/rest/options';
import {environment} from '../environments/environment';
import {Logger} from 'angular2-logger/core';
import {AgreementSearchRequestDto} from '../../shared/model/search/agreement-search-request-dto';
import {AgreementSearchResultDto} from './dto/agreement-search-result-dto';
import {ServiceType} from '../../shared/model/service-type';
import {ContextMenuAgreement} from "../../shared/model/context-menu-agreement";
import {WebResponse} from "../../shared/model/web-response";
import {ConfirmationService} from "primeng/primeng";
import {GrowlService} from "../../shared/component/growl/growl.service";
import {_throw} from "rxjs/observable/throw";

const agreementContext = `${environment.context}/api/agreement`;

@Injectable()
export class AgreementSearchService {

  constructor(private http: HttpClient,
              private logger: Logger,
              private confirmationService: ConfirmationService,
              private growlService: GrowlService) {
  }

  getCriteriasDics(): Observable<AgreementsSearchCriteriaDicsDto> {
    return this.http.get<AgreementsSearchCriteriaDicsDto>(`${agreementContext}/dicts`, REST_OPTIONS).pipe(
            map((data: AgreementsSearchCriteriaDicsDto) => {
              this.logger.debug('criteria dics received: ', data);
              return ObjectMapper.deserialize(AgreementsSearchCriteriaDicsDto, data);
            })
           );
  }

  getWorktypesByAuctionSubjects(ids: number[]): Observable<ServiceType[]> {
    return this.http.post<ServiceType[]>(`${agreementContext}/worktypes`, JSON.stringify({eAuctionSubjectIds: ids}), REST_OPTIONS).pipe(
              map((data: ServiceType[]) => {
                this.logger.debug('criteria worktypes received: ', data);
                return ObjectMapper.deserializeArray(ServiceType, data);
              })
           );
  }

  searchAgreements(searchRequest: AgreementSearchRequestDto): Observable<AgreementSearchResultDto> {
    return this.http.post<AgreementSearchResultDto>(`${agreementContext}/search`, ObjectMapper.serialize(searchRequest), REST_OPTIONS).pipe(
              map((data: AgreementSearchResultDto) => {
                this.logger.debug('registry records received: ', data);
                return ObjectMapper.deserialize(AgreementSearchResultDto, data);
              })
           );
  }

  /**
   * corresponded to AgreementCommonInfoController.removeCommonInfo()
   */
  removeAgreementInfo(aggRecord: ContextMenuAgreement, callback: () => any) {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить информацию о договоре ${aggRecord.agreementNumber ? aggRecord.agreementNumber : ''} на сумму ${aggRecord.price}?`,
      accept: () => {
        this.http.delete<{result: string}>(`${agreementContext}/common/remove/${aggRecord.agreementInfoId}`, REST_OPTIONS).subscribe(
          (data: {result: string}) => {
            this.logger.debug(`remove result for record with agreementInfoId = ${aggRecord.agreementInfoId} received: `, data);
            if (data.result !== 'SUCCESS') {
              _throw(new Error('remove result is failed'));
            }
            this.growlService.addSuccess('Запиь успешно удалена');
            callback();
          },
          (error: Error) => {
            this.growlService.addSuccess('Возникла ошибка при удалении записи');
          });
      }
    });
  }

}

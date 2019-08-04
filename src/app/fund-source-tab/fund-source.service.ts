import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {map, take} from 'rxjs/operators';
import {Logger} from 'angular2-logger/core';
import {AgreementInfo} from '../../shared/model/agreement-info';
import {AgreementsPaymentTerm} from '../../shared/model/agreements-payment-term';
import {ObjectMapper} from '../../shared/rest/mapper';
import {WebResponse} from '../../shared/model/web-response';
import {REST_OPTIONS} from '../../shared/rest/options';
import {environment} from '../environments/environment';
import {_throw} from 'rxjs/observable/throw';
import {GrowlService} from '../../shared/component/growl/growl.service';

const fsourcesContext = `${environment.context}/api/fund-sources`;

@Injectable()
export class FundSourceService {

    constructor(private http: HttpClient,
                private logger: Logger,
                private growlService: GrowlService) {
    }

    /**
     * AgreementInfoFundsSourcesController.getAgreementInfoFundsSources()
     */
    getFundsSource(agreementInfoId: number): Observable<AgreementInfo> {
        return this.http.get<AgreementInfo>(`${fsourcesContext}/${agreementInfoId}/list`, REST_OPTIONS).pipe(
            take(1),
            map((fundsSourceResp: Object) => {
                this.logger.debug('fund sources received: ', fundsSourceResp);
                let dto: AgreementInfo = ObjectMapper.deserialize(AgreementInfo, fundsSourceResp);
                dto = this.agreementFundSourcesPostDeserialization(dto);
                return dto;
            })
        );
    }

    saveFundSources(fundSources: AgreementInfo): Observable<{result: string}> {
        const serialized = ObjectMapper.serialize(fundSources);
        this.logger.debug('fund sources send: ', serialized);
        return this.http.post<{result: string}>(`${fsourcesContext}/save`, serialized, REST_OPTIONS).pipe(
            take(1),
            map((data: {result: string}) => {
                this.logger.debug(`save result for fund-sources with agreementInfoId = ${fundSources.agreementInfoId} received: `, data);
                if (data.result !== 'SUCCESS') {
                  _throw(new Error('remove result is failed'));
                }
                this.growlService.addSuccess('Информация успешно сохранена');
                return data;
            })
        );
    }

    agreementFundSourcesPostDeserialization(dto: AgreementInfo): AgreementInfo {
        dto.agreementsPhases.forEach(phase => {
            if (!phase.agreementsPaymentsTerms.length) {
                phase.agreementsPaymentsTerms.push(new AgreementsPaymentTerm(dto.agreementsFundsSources[0], phase.dateBegin.getFullYear()));
            } else {
                // update keys to unique by ID
                phase.agreementsPaymentsTerms.forEach(term => {
                    term.agreementsFundsSource = dto.agreementsFundsSources.find(fs => fs.id === term.agreementsFundsSource.id);
                });
            }
            phase.updateMaps();
        });
        return dto;
    }


}

import {JsonProperty} from '../../rest/mapper/index';
import {AgreementsFundsSource} from '../agreements-funds-source';
import {AuctionSubject} from '../auction-subject';
import {ServiceType} from '../service-type';

export class AgreementsSearchCriteriaDicsDto {

  @JsonProperty({type: AuctionSubject})
  eAuctionSubjects: AuctionSubject[] = [];

  agreementWorkTypes: ServiceType[] = [];

  @JsonProperty({type: AgreementsFundsSource})
  agreementsFundsSourceTypes: AgreementsFundsSource[] = [];

  constructor() {
    // provide deserialization empty constructor
  }
}

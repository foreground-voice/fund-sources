import {AgreementsFundsSource} from './agreements-funds-source';

export class AgreementsPaymentTerm {
  agreementsFundsSource?: AgreementsFundsSource;
  year?: number;
  sumRub?: number;

  constructor(agreementFundsSource: AgreementsFundsSource = null, year: number = null, sumRub: number = null) {
    this.agreementsFundsSource = agreementFundsSource;
    this.year = year;
    this.sumRub = sumRub;
  }
}

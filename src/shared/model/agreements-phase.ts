import {AgreementsPaymentTerm} from './agreements-payment-term';
import {DateTimeSerializerDeserializer} from '../../shared/rest/serilizators/date-time-serializer-deserializer';
import {JsonIgnore, JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';
import {LocaleDateTime} from '../../shared/component/locale-date-time';
import * as moment from 'moment';
import {AgreementsFundsSource} from './agreements-funds-source';

export class AgreementsPhase {

  @JsonProperty()
  id: number = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateBegin: Date = null;

  @JsonProperty({type: Date, serializer: DateTimeSerializerDeserializer, deserializer: DateTimeSerializerDeserializer})
  dateEnd: Date = null;

  @JsonProperty()
  guid: string = null;

  @JsonProperty({type: AgreementsPaymentTerm, required: false})
  agreementsPaymentsTerms: AgreementsPaymentTerm[] = [];

  get years(): number[] {
    const years: number[] = [];
    let steps: number = this.dateEnd.getFullYear() - this.dateBegin.getFullYear() + 1;
    while (steps-- > 0) {
      years.push(this.dateBegin.getFullYear() + steps);
    }
    return years.reverse();
  }

  get fullName(): string {
    return `от ${moment(this.dateBegin).format(LocaleDateTime.MOMENT_DATE_FORMAT)} до ${moment(this.dateEnd).format(LocaleDateTime.MOMENT_DATE_FORMAT)}`;
  }

  /**
   *  matrix of payment terms
   */
  @JsonIgnore()
  paymentTermRows: Map<AgreementsFundsSource, AgreementsPaymentTerm[]> = null;
  @JsonIgnore()
  paymentTermRowsKeys: AgreementsFundsSource[] = [];
  @JsonIgnore()
  paymentTermRowsEntries: {fs: AgreementsFundsSource, terms: AgreementsPaymentTerm[]}[] = [];
  @JsonIgnore()
  paymentTermColumns: Map<number, AgreementsPaymentTerm[]> = null;
  @JsonIgnore()
  paymentTermColumnsKeys: number[] = [];

  getPaymentTermRows(): Map<AgreementsFundsSource, AgreementsPaymentTerm[]> {
    const map: Map<AgreementsFundsSource, AgreementsPaymentTerm[]> = new Map(
      this.agreementsPaymentsTerms.map(term => [term.agreementsFundsSource, this.agreementsPaymentsTerms.filter(term2 => term2.agreementsFundsSource === term.agreementsFundsSource)] as [AgreementsFundsSource, AgreementsPaymentTerm[]])
    );
    return map;
  }

  getPaymentTermColumns(): Map<number, AgreementsPaymentTerm[]> {
    const map: Map<number, AgreementsPaymentTerm[]> = new Map(
      this.agreementsPaymentsTerms.map(term => [term.year, this.agreementsPaymentsTerms.filter(term2 => term2.year === term.year)] as [number, AgreementsPaymentTerm[]])
    );
    return map;
  }

  getPaymentTermBy(fs: AgreementsFundsSource, year: number): AgreementsPaymentTerm  {
    return this.agreementsPaymentsTerms.find(term => term.year === year && term.agreementsFundsSource === fs);
  }

  setPaymentTermBy(fs: AgreementsFundsSource, year: number, sumRub: number) {
    const term = this.getPaymentTermBy(fs, year);
    if (term) {
      term.sumRub = sumRub;
    } else {
      this.agreementsPaymentsTerms.push(new AgreementsPaymentTerm(fs, year, sumRub));
      this.updateMaps();
    }
  }

  /**
   * call this method manually when changes data array
   */
  updateMaps() {
    this.paymentTermRows = this.getPaymentTermRows();
    this.paymentTermRowsKeys = Array.from(this.paymentTermRows.keys());
    this.paymentTermRowsEntries = Array.from(this.paymentTermRows.entries()).map(entry => {
      return {fs: entry[0], terms: entry[1]};
    });
    this.paymentTermColumns = this.getPaymentTermColumns();
    this.paymentTermColumnsKeys = Array.from(this.paymentTermColumns.keys());
  }

}

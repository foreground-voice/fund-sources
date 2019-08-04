import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Logger} from 'angular2-logger/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgreementInfo} from '../../shared/model/agreement-info';
import {LocaleNumber} from '../../shared/component/locale-number';
import {FundSourceService} from './fund-source.service';
import {ConfirmationService, SelectItem} from 'primeng/primeng';
import {AgreementsPhase} from '../../shared/model/agreements-phase';
import {AgreementsFundsSource} from '../../shared/model/agreements-funds-source';
import {AgreementsPaymentTerm} from '../../shared/model/agreements-payment-term';
import {MenuItem} from 'primeng/api';
import {NgForm} from '@angular/forms';
import {GrowlService} from '../../shared/component/growl/growl.service';


@Component({
  selector: 'app-fund-source-tab',
  templateUrl: './fund-source-tab.component.html',
  styleUrls: ['./fund-source-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FundSourceService]
})
export class FundSourceTabComponent implements OnInit {

  JSON = JSON;
  LocaleNumber = LocaleNumber;

  agreementInfoId: number = null;
  fundsSource: AgreementInfo = new AgreementInfo();
  breadcrumbItems: MenuItem[] = [
    {label: 'Назад', routerLink: ['/']},
    {label: 'Источники финансирования'}
  ];
  @ViewChild(NgForm)
  myForm: NgForm = null;

  constructor(
    private service: FundSourceService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: Logger,
    private confirmationService: ConfirmationService,
    private growlService: GrowlService) {
  }

  ngOnInit() {
    this.agreementInfoId = Number(this.route.snapshot.params.agreementInfoId);
    this.loadingStart();
    this.service.getFundsSource(this.agreementInfoId).subscribe(fundsSourceResp => {
      this.logger.debug('fund sources deserialized: ', fundsSourceResp);
      this.fundsSource = fundsSourceResp;
    });
  }

  loadingStart() {
    this.logger.debug('loading start');
  }

  loadingFinish = (): void => {
    this.logger.debug('loading finished');
  }

  allowedAgreementsFundsSources(phase: AgreementsPhase, currentFS: AgreementsFundsSource): SelectItem[] {
    const fss: SelectItem[] = this.fundsSource.agreementsFundsSources.filter(fs => !phase.paymentTermRowsKeys.includes(fs) || fs === currentFS)
      .map(fs => <SelectItem>{
          value: fs,
          label: fs.typeName
        }
      );
    return fss;
  }

  allowedYears(phase: AgreementsPhase, currentYear: number): SelectItem[] {
    const years: SelectItem[] = phase.years.filter(year => !phase.paymentTermColumnsKeys.includes(year) || year === currentYear )
      .map(year => <SelectItem>{
          value: year,
          label: year + ''
        }
      );
    return years;
  }

  onYearChange(phase: AgreementsPhase, year: number, terms: AgreementsPaymentTerm[]) {
    terms.forEach(term => term.year = year);
    phase.updateMaps();
  }

  onFundSourceChange(phase: AgreementsPhase, fs: AgreementsFundsSource, terms: AgreementsPaymentTerm[]) {
    terms.forEach(term => term.agreementsFundsSource = fs);
    phase.updateMaps();
  }

  onFundSourceAddClick(phase: AgreementsPhase) {
    const unusedFS: AgreementsFundsSource = this.fundsSource.agreementsFundsSources.find(fs => !phase.paymentTermRowsKeys.includes(fs));
    phase.agreementsPaymentsTerms.push(new AgreementsPaymentTerm(unusedFS, phase.dateBegin.getFullYear()));
    phase.updateMaps();
  }

  onFundSourceRemoveClick(phase: AgreementsPhase, fs: AgreementsFundsSource) {
    this.confirmationService.confirm({
      message: `Вы действительно хотите удалить источник финансирования?`,
      accept: () => {
        phase.agreementsPaymentsTerms = phase.agreementsPaymentsTerms.filter(term => term.agreementsFundsSource !== fs);
        phase.updateMaps();
      }
    });
  }

  onTermAddClick(phase: AgreementsPhase) {
    const unusedYear: number = phase.years.find(year => !phase.paymentTermColumnsKeys.includes(year));
    phase.agreementsPaymentsTerms.push(new AgreementsPaymentTerm(this.fundsSource.agreementsFundsSources[0], unusedYear));
    phase.updateMaps();
  }

  onTermRemoveClick(phase: AgreementsPhase, year: number) {
    phase.agreementsPaymentsTerms = phase.agreementsPaymentsTerms.filter(term => term.year !== year);
    phase.updateMaps();
  }


  calcFullSum(): number {
    let sum = 0;
    this.fundsSource.agreementsPhases.forEach(phase => sum += this.calcPhaseSum(phase));
    return sum;
  }

  calcPhaseSum(phase: AgreementsPhase, year?: number): number {
    let sum = 0;
    phase.agreementsPaymentsTerms.forEach(term => {
      if (year && term.year !== year) {
        sum += 0;
      } else {
        sum += term.sumRub;
      }
    });
    return sum;
  }

  trackFsFn(index: number, item: {fs: AgreementsFundsSource, term: AgreementsPaymentTerm}) {
    return item.fs.id;
  }

  trackYearFn(index: number, year: number) {
    return year;
  }

  save() {
    // validation
    if (this.myForm.invalid) {
      this.growlService.addError('Необходимо исправить поля формы');
      return;
    }
    this.service.saveFundSources(this.fundsSource).subscribe();
  }
}

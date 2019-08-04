import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AgreementsSearchCriteriaDicsDto} from '../../shared/model/search/agreements-search-criteria-dics-dto';
import {AgreementsSearchCriteriaDto} from '../../shared/model/search/agreements-search-criteria-dto';
import {AgreementsRegistryRecordDto} from '../../shared/model/search/agreements-registry-record-dto';
import {ConfirmDialog, ContextMenu, MenuItem, SortMeta} from 'primeng/primeng';
import {HttpErrorResponse} from '@angular/common/http';
import {ObjectMapper} from '../../shared/rest/mapper';
import {LocaleDateTime} from '../../shared/component/locale-date-time';
import {AgreementSearchService} from './agreement-search.service';
import {Router} from '@angular/router';
import {MultiselectListComponent} from '../../shared/component/multiselect-list/multiselect-list.component';
import {AgreementsContextMenuItem} from '../../shared/model/agreements-context-menu-item';
import {Logger} from 'angular2-logger/core';
import {GrowlService} from '../../shared/component/growl/growl.service';
import {AgreementSearchRequestDto} from '../../shared/model/search/agreement-search-request-dto';
import {ResultsCountsByStage} from './dto/agreement-search-result-dto';
import * as moment from 'moment';
import {Status} from '../../shared/model/status';
import {Stage} from '../../shared/model/stage';
import {AuctionSubject} from '../../shared/model/auction-subject';
import {ServiceType} from '../../shared/model/service-type';
import {LocaleNumber} from '../../shared/component/locale-number';
import 'rxjs/add/operator/finally';
import {AppService} from '../app.service';


@Component({
  selector: 'app-agreement-search',
  templateUrl: './agreement-search.component.html',
  styleUrls: ['./agreement-search.component.scss'],
  providers: [AgreementSearchService],
  encapsulation: ViewEncapsulation.None
})
export class AgreementSearchComponent implements OnInit {

  LocaleNumber = LocaleNumber;
  LocaleDateTime = LocaleDateTime;
  Status = Status;
  Stage = Stage;

  currentStage: Stage = null;
  totalResultsCount: ResultsCountsByStage = new ResultsCountsByStage();
  agreementSearchCriteria: AgreementsSearchCriteriaDto = this.createNewCriteria();
  agreementSearchCriteriaDics: AgreementsSearchCriteriaDicsDto = new AgreementsSearchCriteriaDicsDto();

  agreementsRegRecords: AgreementsRegistryRecordDto[] = [];
  selectedRegRecord: AgreementsRegistryRecordDto = null;

  @ViewChild(MultiselectListComponent)
  eAuctionSubjects: MultiselectListComponent<AuctionSubject> = null;

  @ViewChild(ContextMenu)
  tableCtxMenu: ContextMenu = null;

  tableCtxMenuItems: AgreementsContextMenuItem[] = [
    AgreementsContextMenuItem.EDIT_FUND_SOURCES.create((event) => this.router.navigate(['/fund-sources', this.selectedRegRecord.agreementInfoId])),
    AgreementsContextMenuItem.REMOVE.create((event) => this.service.removeAgreementInfo(this.selectedRegRecord, this.search))
  ];

  @ViewChild(ConfirmDialog)
  removeDialog: ConfirmDialog = null;

  tabMenuItems: MenuItem[] = [];
  reestrNumber: string = null;


  constructor(private service: AgreementSearchService,
              private logger: Logger,
              private router: Router,
              public growlService: GrowlService,
              private appService: AppService) {
  }

  ngOnInit() {
    // hack of context-menu's function
    this.hackContextMenuHide();

    // update tabmenu
    this.recreateTabMenuItems();

    this.loadingStart();
    this.service.getCriteriasDics()
      .finally(this.loadingFinish)
      .subscribe(agreementSearchCriteriaDics =>
      this.agreementSearchCriteriaDics = agreementSearchCriteriaDics,
      this.handleConnectionError,
      this.search);
  }

  hackContextMenuHide() {
    const oldListener =  this.tableCtxMenu.unbindDocumentClickListener.bind(this.tableCtxMenu);
    const onTableCtxMenuHide = this.onTableCtxMenuHide.bind(this);
    this.tableCtxMenu.unbindDocumentClickListener = function() {
      oldListener();
      onTableCtxMenuHide();
    };
  }

  get tabMenuSelectedItem(): MenuItem {
    if (!this.tabMenuItems.length) {
      return null;
    }
    if (!this.currentStage) {
      return this.tabMenuItems[this.tabMenuItems.length - 1];
    }
    return this.tabMenuItems.find(item => item.id === this.currentStage.alias);
  }

  onTabMenuSelectedItem(value: MenuItem) {
    this.currentStage = Stage.byAlias(value.id);
    this.search();
  }
  recreateTabMenuItems() {
    const result = [
      {
        id: Stage.PREPARE_INFORMATION.alias,
        label: `Подготовка информации (${this.totalResultsCount.stagePrCount})`,
        disabled: !this.totalResultsCount.stagePrCount
      },
      {
        id: Stage.RUNING.alias,
        label: `Исполнение (${this.totalResultsCount.stageECount})`,
        disabled: !this.totalResultsCount.stageECount
      },
      {
        id: Stage.STOPPED.alias,
        label: `Исполнение прекращено (${this.totalResultsCount.stageETCount})`,
        disabled: !this.totalResultsCount.stageETCount
      },
      {
        id: Stage.COMPLETED.alias,
        label: `Исполнение завершено (${this.totalResultsCount.stageECCount})`,
        disabled: !this.totalResultsCount.stageECCount
      },
      {
        id: null,
        label: `Все этапы (${this.totalResultsCount.allStagesCount})`,
        disabled: !this.totalResultsCount.allStagesCount
      }
    ];
    result.forEach((item: MenuItem) => item.command = (event) => this.onTabMenuSelectedItem(item));
    this.tabMenuItems = result;
  }

  createNewCriteria(): AgreementsSearchCriteriaDto {
    return new AgreementsSearchCriteriaDto(
      [
        {label: Stage.PREPARE_INFORMATION.name, checked: true, value: Stage.PREPARE_INFORMATION},
        {label: Stage.RUNING.name, checked: true, value: Stage.RUNING},
        {label: Stage.STOPPED.name, checked: false, value: Stage.STOPPED},
        {label: Stage.COMPLETED.name, checked: false, value: Stage.COMPLETED}
      ]);
  }

  search = () => {
    this.loadingStart();
    this.logger.debug('search: ' + ObjectMapper.serialize(this.agreementSearchCriteria));
    this.service.searchAgreements(new AgreementSearchRequestDto(this.agreementSearchCriteria, this.currentStage))
      .finally(this.loadingFinish)
      .subscribe(agreementResultDto => {
        this.totalResultsCount = agreementResultDto.totalResultsCount;
        this.agreementsRegRecords = agreementResultDto.resultsForSelectedStage;
        // this.logger.debug('agreementsRegRecords deserialized: ' + JSON.stringify(this.agreementsRegRecords));
        // update tabs
        this.recreateTabMenuItems();
      }, this.handleConnectionError);
  }

  eAuctionSubjectsChanged(selecteditems: AuctionSubject[]) {
    this.agreementSearchCriteria.eAuctionSubjects = selecteditems;
    this.service.getWorktypesByAuctionSubjects(selecteditems.map(item => item.id))
      .finally(this.loadingFinish)
      .subscribe(agreementWorktypes =>
      // WARNING: reset of selected items in "service types" input control
      this.agreementSearchCriteriaDics.agreementWorkTypes = agreementWorktypes);
  }

  onTableCtxMenu(entity: AgreementsRegistryRecordDto, event: any) {
    this.tableCtxMenu.hide();
    if (this.selectedRegRecord === entity) {
      return;
    }
    this.selectedRegRecord = entity;
    if (!(this.selectedRegRecord)) {
      return;
    }
    setTimeout(() => this.tableCtxMenu.show(event), 200);
  }

  onTableCtxMenuHide() {
    this.selectedRegRecord = null;
  }

  handleConnectionError = (err: HttpErrorResponse|Error) => {
    this.loadingFinish();
    // if (err instanceof HttpErrorResponse) {
    //   this.logger.debug(`Backend returned code ${err.status} `, err);
    //   return;
    // }
    if (err instanceof Error) {
      this.logger.debug('An error occurred: ', err);
      this.growlService.addError('Произошла непредвиденная ошибка');
      return;
    }
  }

  loadingStart() {
    this.logger.debug('loading start');
    // this.isLoading = true;
  }

  loadingFinish = () => {
    this.logger.debug('loading finish');
    // this.isLoading = false;
  }

  joinToString(names: string[]): string {
    return names ? names.map(item => item ? item : 'Не задан').join(', ') : '';
  }

  /**
   * The button resets criteria to default values
   */
  clearFilter() {
    this.logger.debug('clear filter');
    this.agreementSearchCriteriaDics.agreementsFundsSourceTypes.forEach(item => item.checked = false);
    this.agreementSearchCriteriaDics.eAuctionSubjects.forEach(item => item.checked = false);
    this.agreementSearchCriteriaDics.agreementWorkTypes.forEach(item => item.checked = false);
    this.agreementSearchCriteria = this.createNewCriteria();

    // force changes
    this.agreementSearchCriteriaDics.agreementsFundsSourceTypes = this.agreementSearchCriteriaDics.agreementsFundsSourceTypes.slice();
    this.agreementSearchCriteriaDics.eAuctionSubjects = this.agreementSearchCriteriaDics.eAuctionSubjects.slice();
    this.agreementSearchCriteriaDics.agreementWorkTypes = this.agreementSearchCriteriaDics.agreementWorkTypes.slice();
  }

  doSort(event: SortMeta) {
    this.logger.debug('doSort: ' + event);
  }

  changeSort(event: SortMeta) {
    this.logger.debug('changeSort: ' + event);
  }

  isToday(date: Date): boolean {
    return moment(date).isSame(new Date(), 'day');
  }

  formatDateTime(date: Date) {
    return date ? moment(date).format('DD.MM.YYYY HH:mm:SS') : null;
  }

}

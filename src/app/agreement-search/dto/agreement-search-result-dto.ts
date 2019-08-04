import {AgreementsRegistryRecordDto} from '../../../shared/model/search/agreements-registry-record-dto';
import {JsonProperty} from '../../../shared/rest/mapper/DecoratorMetadata';

export class ResultsCountsByStage {
  /**
   * Подготовка информации
   */
  @JsonProperty()
  stagePrCount: number = 0;

  /**
   * Исполнение
   */
  @JsonProperty()
  stageECount: number = 0;

  /**
   * Исполнение прекращено
   */
  @JsonProperty()
  stageETCount: number = 0;

  /**
   * Исполнение завершено
   */
  @JsonProperty()
  stageECCount: number = 0;

  /**
   * Все этапы
   */
  @JsonProperty()
  allStagesCount: number = 0;
}

export class AgreementSearchResultDto {

  @JsonProperty({type: AgreementsRegistryRecordDto})
  resultsForSelectedStage: AgreementsRegistryRecordDto[] = [];

  @JsonProperty({type: ResultsCountsByStage})
  totalResultsCount: ResultsCountsByStage = new ResultsCountsByStage();

}


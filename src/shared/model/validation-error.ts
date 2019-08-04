import {JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';

export class ValidationError {

  /**
   * id ошибки валидации
   */
  @JsonProperty()
  id: number = null;

  /**
   * название вкладки
   */
  @JsonProperty()
  pageId: string = null;

  /**
   * Текст ошибки валидации
   */
  @JsonProperty()
  value: string = null;

  /**
   * Текст ошибки валидации
   */
  @JsonProperty()
  extendedValue: string = null;

  /**
   * Тип ошибки
   */
  @JsonProperty()
  errorType: string = null;

  /**
   * ?
   * @type {any}
   */
  idx: number = null;
}

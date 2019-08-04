import {CacheKey, Deserializer, Serializer} from '../mapper/DecoratorMetadata';
import * as moment from 'moment';
import {LocaleDateTime} from '../../../shared/component/locale-date-time';

@CacheKey('DateTimeSerializerDeserializer')
export class DateTimeSerializerDeserializer implements Deserializer, Serializer {

  static serializeTo(value: Date): string {
    return JSON.stringify(moment(value).format(LocaleDateTime.JSON_DATE_TIMEFORMAT));
  }

  static deserializeTo(value: string): Date {
    return value ? moment(value, LocaleDateTime.JSON_DATE_TIMEFORMAT).toDate() : null;
  }

  public serialize(value: Date): string {
    return DateTimeSerializerDeserializer.serializeTo(value);
  }

  public deserialize(value: any): Date {
    return DateTimeSerializerDeserializer.deserializeTo(value);
  }

}

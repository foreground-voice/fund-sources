import {CacheKey, Deserializer, JsonConverstionError, Serializer} from '../mapper/DecoratorMetadata';

@CacheKey('PseudoEnumSerializerDeserializer')
export class PseudoEnumSerializerDeserializer implements Deserializer, Serializer {

  static deserializeTo<E>(value: string, type: { new(): E }): E {
    if (!type['byAlias']) {
      throw new JsonConverstionError('Pseudo Enum must implement static method byAlias(string): ' + type['name'], '' + value);
    }
    return type['byAlias'](value);
  }

  static serializeTo<E>(value: E, type: { new(): E }): any {
    if (!value['alias']) {
      throw new JsonConverstionError('Pseudo Enum must implement field "alias: string" ' + type['name'], '' + value);
    }
    return '"' + (value as any).alias + '"';
  }

  deserialize<E>(value: any, type: { new(): E }): E {
    return PseudoEnumSerializerDeserializer.deserializeTo(value, type);
  }

  serialize<E>(value: E, type: { new(): E }): any {
    return PseudoEnumSerializerDeserializer.serializeTo(value, type);
  }


}

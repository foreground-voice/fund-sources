/**
 * Helper functions for JS reflections.
 */
import {
  JSON_IGNORE_DECORATOR_NAME,
  JSON_PROPERTY_DECORATOR_NAME,
  JsonPropertyDecoratorMetadata
} from './DecoratorMetadata';
import {Reflect} from 'core-js/library/stage/pre.js';

/**
 * Returns the JsonProperty decorator metadata.
 */
export const getJsonPropertyDecoratorMetadata = (target: any, key: string): JsonPropertyDecoratorMetadata => {
  let metadata: JsonPropertyDecoratorMetadata = Reflect.getMetadata(JSON_PROPERTY_DECORATOR_NAME, target, key);
  if (!metadata && Reflect.hasMetadata(JSON_PROPERTY_DECORATOR_NAME, target, key)) {
    metadata = {};
  }
  if (metadata && metadata.name === undefined) {
    metadata.name = key;
  }
  if (metadata && metadata.required === undefined) {
    metadata.required = true;
  }
  return metadata;
};

/**
 * Returns the JsonProperty name (if any) associated with the object instance.
 * If any JsonProperty metadata found, it returns the key name as the name of the property.
 */
export const getKeyName = (target: any, key: string): string => {
    const metadata: JsonPropertyDecoratorMetadata = getJsonPropertyDecoratorMetadata(target, key);
    // tslint:disable-next-line:triple-equals
    if (metadata != undefined && metadata.name != undefined) {
        return metadata.name;
    } else {
        return key;
    }
};

/**
 * Returns the JsonPropertyDecoratorMetadata for the property
 */
export const getJsonPropertyDecorator = (metadata: any) => {
    return Reflect.metadata(JSON_PROPERTY_DECORATOR_NAME, metadata);
};

/**
 * Returns the JsonIgnoreDecoratorMetadata for the property
 */
export const defineJsonIgnoreDecorator = () => {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata(JSON_IGNORE_DECORATOR_NAME, true, target, propertyKey);
    };
};

/**
 * Checks to see if the specified type is a standard JS object type.
 */
export const isSimpleType = (typeName: string): boolean => {
    switch (typeName) {
        case Constants.STRING_TYPE: return true;
        case Constants.NUMBER_TYPE: return true;
        case Constants.BOOLEAN_TYPE: return true;
        case Constants.DATE_TYPE: return true;
        case Constants.STRING_TYPE_LOWERCASE: return true;
        case Constants.NUMBER_TYPE_LOWERCASE: return true;
        case Constants.BOOLEAN_TYPE_LOWERCASE: return true;
        case Constants.DATE_TYPE_LOWERCASE: return true;
        default: return false;
    }
};

/**
 * Returns the the instance type name by looking at the constructor name.
 * Stupid IE does not have name property! Hence the hack.
 */
export const getTypeNameFromInstance = (instance): string => {
    return instance.toString().trim().split(/[\s\()]/g)[1];
};

const getType = (instance: any, key: string): any => {
    return Reflect.getMetadata('design:type', instance, key);
};

export const isArrayType = (instance: any, key: string): boolean => {
    return Array === getType(instance, key);
};

export const getTypeName = (instance, key): string => {
    const type = getType(instance, key);
    // tslint:disable-next-line:triple-equals
    if (type != undefined) {
        return getTypeNameFromInstance(type);
    }
    return type;
};

export const Constants = {
    OBJECT_TYPE: 'Object',
    OBJECT_TYPE_LOWERCASE: 'object',
    STRING_TYPE: 'String',
    STRING_TYPE_LOWERCASE: 'string',
    NUMBER_TYPE: 'Number',
    NUMBER_TYPE_LOWERCASE: 'number',
    BOOLEAN_TYPE: 'Boolean',
    BOOLEAN_TYPE_LOWERCASE: 'boolean',
    DATE_TYPE: 'Date',
    DATE_TYPE_LOWERCASE: 'date',
    ARRAY_TYPE: 'Array',
    ARRAY_TYPE_LOWERCASE: 'array',
    FROM_ARRAY: 'fromArray'
};

export const getCachedType = (type: any, cache: Object): any => {
    // tslint:disable-next-line:triple-equals
    const typeName: string = type.getJsonObjectMapperCacheKey != undefined ? type.getJsonObjectMapperCacheKey() : getTypeNameFromInstance(type);
    if (!cache[typeName]) {
        cache[typeName] = new type();
    }
    return cache[typeName];
};

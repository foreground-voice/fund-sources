import {defineJsonIgnoreDecorator, getJsonPropertyDecorator} from './ReflectHelper';

/**
 * Decorator names
 */
export const JSON_PROPERTY_DECORATOR_NAME = 'JsonProperty';
export const JSON_IGNORE_DECORATOR_NAME = 'JsonIgnore';

/**
 * Decorator metadata definition for JsonProperty
 */
export interface JsonPropertyDecoratorMetadata {
    name?: string; // name of the JSON property to map
    required?: boolean; // is this field required in the JSON object that is being deserialized
    access?: AccessType; // is this serializable and de-serializable
    type?: { new(...any): any }; // the type of Object that should be assigned to this property
    serializer?: { new(...any): any }; // Serializer for the type
    deserializer?: { new(...any): any }; // deserializer for the type
}

export enum AccessType {
    READ_ONLY, WRITE_ONLY, BOTH
}

export interface Serializer {
    serialize(value: any, type?: { new(): any }): any;
}

export interface Deserializer {
    deserialize(value: any, type?: { new(): any }): any;
}

/**
 * JsonProperty Decorator function.
 */
export const JsonProperty = (metadata?: JsonPropertyDecoratorMetadata | string): any => {
    if (typeof metadata === 'string') {
        return getJsonPropertyDecorator({ name: metadata as string, required: true, access: AccessType.BOTH });
    } else {
        return getJsonPropertyDecorator(metadata);
    }
};

/**
 * Decorator for specifying cache key.
 * Used for Serializer/Deserializer caching.
 *
 * @export
 * @param {string} key
 * @returns
 */
export function CacheKey(key: string): Function {
    return (f: Function) => {
        const functionName = 'getJsonObjectMapperCacheKey';
        const functionImpl = new Function(`return '${key}';`);
        f[functionName] = functionImpl;
    };
}

/**
 * JsonIgnore Decorator function.
 */
export const JsonIgnore = (): Function => {
    return defineJsonIgnoreDecorator();
};

/**
 * Json convertion error type.
 */
export class JsonConverstionError extends Error {
    readonly json: string;

    constructor(message: string, json: string) {
      super(message);
      // Set the prototype explicitly.
      Reflect.setPrototypeOf(this, JsonConverstionError.prototype);

      this.json = json;
    }
}

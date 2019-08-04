import {Problem} from './problem';
import {JsonProperty} from '../../shared/rest/mapper/DecoratorMetadata';
import {Result} from './result';

/**
 * corresponded class for WebResponseImpl
 */
export class WebResponse<T> {
  /**
   *  string of ResponseStatus enum
   */
  @JsonProperty()
  status: string = null;

  @JsonProperty({required: false})
  problem: Problem = null;

  /**
   *  Decorator just declares necessity. It's impossible to define T here and then you'll need post-deserialization of known fields.
   */
  @JsonProperty()
  results: {[key: string]: Result<T>} /* Map<string, Result<T>> */ = null;

  constructor() {
    // Reflect.setPrototypeOf(this, WebResponse);
  }
}

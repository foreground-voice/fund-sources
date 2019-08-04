import {ValidationError} from './validation-error';

export class ValidationResult {

  [key: string /* ErrorType */]: ValidationError[];
}

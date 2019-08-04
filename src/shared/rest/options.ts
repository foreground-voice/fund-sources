import {HttpHeaders} from '@angular/common/http';

export const REST_OPTIONS: object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // for IE
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  })
};

export const BAD_REQUEST_CODE = 500;

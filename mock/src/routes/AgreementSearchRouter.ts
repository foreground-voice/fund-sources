import {Router, RequestHandler, Request, Response, NextFunction} from 'express';
import {clone, JSON_DATE_TIMEFORMAT, jsonBypass} from '../utils';
import * as moment from 'moment';


const DIR: string = './data/agreement';

export class AgreementSearchRouter {

  router: Router;

  /**
   * Initialize the AgreementSearchRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  private init() {
    this.router.get('/dicts', jsonBypass(`${DIR}/search-dicts.json`));
    this.router.post('/worktypes', jsonBypass(`${DIR}/worktypes.json`));
    this.router.post('/search', this.search);
    this.router.delete('/common/remove/:id', this.remove);
  }

  private search(req: Request, res: Response, next: NextFunction) {
    let results = require(`../${DIR}/search-results.json`);
    const searchReq = req.body;
    console.log(searchReq);
    if (searchReq.criteria.reestrNumber) {
      results = results.filter(record => record.reestrNumber ? String(record.reestrNumber).includes(searchReq.criteria.reestrNumber) : false);
    }
    if (searchReq.criteria.agreementDateFrom) {
      results = results.filter(record =>
        moment(record.agreementDate, JSON_DATE_TIMEFORMAT).toDate() >= moment(searchReq.criteria.agreementDateFrom, JSON_DATE_TIMEFORMAT).toDate());
    }
    if (searchReq.criteria.agreementDateTo) {
      results = results.filter(record =>
        moment(record.agreementDate, JSON_DATE_TIMEFORMAT).toDate() <= moment(searchReq.criteria.agreementDateTo, JSON_DATE_TIMEFORMAT).toDate());
    }
    if (searchReq.criteria.priceFrom) {
      results = results.filter(record => record.price >= searchReq.criteria.priceFrom);
    }
    if (searchReq.criteria.priceTo) {
      results = results.filter(record => record.price <= searchReq.criteria.priceTo);
    }
    if (searchReq.criteria.stages.length) {
      results = results.filter(record => searchReq.criteria.stages.includes(record.stage));
    }
    res.json({
      'totalResultsCount': {
        'stagePrCount': results.filter(record => 'PR' === record.stage).length,
        'stageECount': results.filter(record => 'E' === record.stage).length,
        'stageETCount': results.filter(record => 'ET' === record.stage).length,
        'stageECCount': results.filter(record => 'EC' === record.stage).length,
        'allStagesCount': results.length
      },
      'resultsForSelectedStage': searchReq.stage ? results.filter(record => searchReq.stage === record.stage) : results
    });
    next();
  }

  private remove(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({result: 'SUCCESS'});
    next();
  }
}

// Create the AgreementSearchRouter, and export its configured Express.Router

export default new AgreementSearchRouter().router;

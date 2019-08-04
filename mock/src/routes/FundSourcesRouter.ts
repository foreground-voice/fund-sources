import {Router, Request, Response, NextFunction} from 'express';
import {jsonBypass} from '../utils';


const DIR: string = './data/fund-sources';

export class FundSourcesRouter {

  router: Router;

  /**
   * Initialize
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
    this.router.get('/:agreementInfoId/list', jsonBypass(`${DIR}/list.json`));
    this.router.post('/save', this.save);
  }

  private save(req: Request, res: Response, next: NextFunction) {
    const saveReq = req.body;
    console.log(saveReq);
    res.status(200).json({result: 'SUCCESS'});
    next();
  }
}

export default new FundSourcesRouter().router;

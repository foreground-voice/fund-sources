import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import AgreementSearchRouter from './routes/AgreementSearchRouter';
import {NextFunction} from 'express';
import {Response} from 'express';
import {Request} from 'express';
import {RequestHandler} from 'express';
import FundSourcesRouter from "./routes/FundSourcesRouter";

// Creates and configures an ExpressJS web server.
class App {

  static ROOT_CONTEXT: string = '/44fz/rd/api';

  // ref to Express instance
  express: express.Application;


  // Run configuration methods on the Express instance.
  constructor() {
    console.log('server start');
    console.log('working directory: ' + path.resolve('.'));
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const rootRouter = express.Router();
    // placeholder route handler
    rootRouter.get('/', (req, res, next) => {
      res.json({
        message: 'Hi! I\'m mock server'
      });
    });
    this.express.use('/', rootRouter);
    this.express.use(`${App.ROOT_CONTEXT}/agreement`, AgreementSearchRouter);
    this.express.use(`${App.ROOT_CONTEXT}/fund-sources`, FundSourcesRouter);
  }

}

export default new App().express;


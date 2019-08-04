export abstract class Environment {
  appName: string = null;
  production: boolean = null;
  context: string = null;
  fileServerContext: string = null;

  constructor(fields: Partial<Environment>) {
    Object.assign(this, fields);
  }
}

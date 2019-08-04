
export class Status {
  public static FORMING: Status = new Status(
    'F',
    'Подготовка',
    null
  );
  public static SENT_TO_CONTROL: Status = new Status(
    'S',
    'Направлено на контроль',
    'Направлено на размещение'
  );
  public static PUBLISHED: Status = new Status(
    'P',
    'Размещено',
    'Размещено'
  );
  public static NOT_PASSED: Status = new Status(
    'B',
    'Контроль не пройден',
    'Не размещено'
  );
  public static INACTIVE: Status = new Status(
    'I',
    'Недействующая редакция (была размещена)',
    null
  );
  public static INACTIVE_NEVER: Status = new Status(
    'BI',
    'Недействующая редакция (не была размещена)',
    null
  );
  public static values: Status[] = [
    Status.FORMING,
    Status.SENT_TO_CONTROL,
    Status.PUBLISHED,
    Status.NOT_PASSED,
    Status.INACTIVE
  ];

  readonly alias: string;
  readonly name: string;
  readonly fkName: string;

  constructor(alias: string, name: string, fkName: string) {
    this.alias = alias;
    this.name = name;
    this.fkName = fkName;
  }

  public static byAlias(alias: string): Status {
    return Status.values.find(status => status.alias === alias);
  }
}

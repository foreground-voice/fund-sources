/**
 * This class similar to Enum
 */
export class Stage {
  public static PREPARE_INFORMATION: Stage = new Stage(
    'PR',
    'Подготовка информации');
  public static RUNING: Stage = new Stage(
    'E',
    'Исполнение'
  );
  public static STOPPED: Stage = new Stage(
    'ET',
    'Исполнение прекращено'
  );
  public static COMPLETED: Stage = new Stage(
    'EC',
    'Исполнение завершено'
  );
  public static values: Stage[] = [
    Stage.PREPARE_INFORMATION,
    Stage.RUNING,
    Stage.STOPPED,
    Stage.COMPLETED
  ];

  readonly alias: string;
  readonly name: string;

  constructor(alias: string, name: string) {
    this.alias = alias;
    this.name = name;
  }

  public static byAlias(alias: string): Stage {
    return Stage.values.find(stage => stage.alias === alias);
  }
}

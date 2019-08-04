export class AgreementProcedureType {
  public static EXECUTION: AgreementProcedureType = new AgreementProcedureType(
    'I',
    'Исполнение',
    'Информация об исполнении договора'
  );
  public static CANCELLING: AgreementProcedureType = new AgreementProcedureType(
    'C',
    'Расторжение',
    'Информация о расторжении договора'
  );
  public static values: AgreementProcedureType[] = [
    AgreementProcedureType.EXECUTION,
    AgreementProcedureType.CANCELLING
  ];

  public static byAlias(alias: string): AgreementProcedureType {
    return AgreementProcedureType.values.find(en => en.alias === alias);
  }

  readonly alias: string;
  readonly name: string;
  readonly fullName: string;

  constructor(alias: string, name: string, fullName: string) {
    this.alias = alias;
    this.name = name;
    this.fullName = fullName;
  }

}


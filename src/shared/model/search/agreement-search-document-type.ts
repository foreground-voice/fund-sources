export class AgreementSearchDocumentType {
  public static AG_INFORMATION: AgreementSearchDocumentType = new AgreementSearchDocumentType(
  'AI',
  'Информация о договоре'
  );
  public static AG_MOD_INFORMATION: AgreementSearchDocumentType = new AgreementSearchDocumentType(
  'AIM',
  'Информация об изменении договора'
  );

  static values: AgreementSearchDocumentType[] = [
    AgreementSearchDocumentType.AG_INFORMATION,
    AgreementSearchDocumentType.AG_MOD_INFORMATION
  ];

  readonly alias: string;
  readonly name: string;

  constructor(alias: string, name: string) {
    this.alias = alias;
    this.name = name;
  }

  public static byAlias(alias: string): AgreementSearchDocumentType {
    return AgreementSearchDocumentType.values.find(dt => dt.alias === alias);
  }
}

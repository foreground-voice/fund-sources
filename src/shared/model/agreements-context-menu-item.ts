import {MenuItem} from 'primeng/primeng';

/**
 * AgreementsContextMenuEnum
 * it's a generic context menu implemented for agreements and procedures in spite of the class name
 */
export class AgreementsContextMenuItem implements MenuItem {

  public static CARD_DOCUMENT: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'CARD_DOCUMENT',
    'Карточка договора'
  );
  public static DOCUMENTS: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'DOCUMENTS',
    'Документы'
  );
  public static EDIT: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'EDIT',
    'Редактировать'
  );
  public static EDIT_FUND_SOURCES: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'EDIT_FUND_SOURCES',
    'Источники финансирования'
  );
  public static REMOVE: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'REMOVE',
    'Удалить'
  );
  public static GO_TO_PUBLIC: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'GO_TO_PUBLIC',
    'Направить на размещение'
  );
  public static EVENT_JOURNAL: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'EVENT_JOURNAL',
    'Журнал событий'
  );
  public static MAKE_CORRECTION: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'MAKE_CORRECTION',
    'Внести исправления'
  );
  public static MAKE_CHANGES: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'MAKE_CHANGES',
    'Внести изменения'
  );
  public static EXECUTION: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'EXECUTION',
    'Исполнение (расторжение) договора'
  );
  public static PRINTED_FORM: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'PRINTED_FORM',
    'Печатная форма'
  );
  public static INCLUDE_TO_REGISTER: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'INCLUDE_TO_REGISTER',
    'Включить в реестр договоров'
  );
  public static FORM_A_PROTOCOL: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'FORM_A_PROTOCOL',
    'Сформировать протокол о несоответствии'
  );
  public static CANCEL_AGREEMENT_PROCEDURE: AgreementsContextMenuItem = new AgreementsContextMenuItem(
    'CANCEL_AGREEMENT_PROCEDURE',
    'Отменить информацию об исполнении (о расторжении)'
  );

  public static readonly values: AgreementsContextMenuItem[] = [
    AgreementsContextMenuItem.CARD_DOCUMENT,
    AgreementsContextMenuItem.DOCUMENTS,
    AgreementsContextMenuItem.EDIT,
    AgreementsContextMenuItem.EDIT_FUND_SOURCES,
    AgreementsContextMenuItem.REMOVE,
    AgreementsContextMenuItem.GO_TO_PUBLIC,
    AgreementsContextMenuItem.EVENT_JOURNAL,
    AgreementsContextMenuItem.MAKE_CORRECTION,
    AgreementsContextMenuItem.MAKE_CHANGES,
    AgreementsContextMenuItem.EXECUTION,
    AgreementsContextMenuItem.PRINTED_FORM,
    AgreementsContextMenuItem.INCLUDE_TO_REGISTER,
    AgreementsContextMenuItem.FORM_A_PROTOCOL,
    AgreementsContextMenuItem.CANCEL_AGREEMENT_PROCEDURE
  ];

  static byAlias(alias: string): AgreementsContextMenuItem {
    return AgreementsContextMenuItem.values.find(item => item.alias === alias);
  }

  readonly alias: string;
  readonly name: string;
  readonly label: string;
  readonly command: (Event) => void;

  private constructor(alias: string = null, name: string = null, command: (Event) => void = null) {
    this.alias = alias;
    this.name = name;
    this.label = name;
    this.command = command;
  }

  create(command: (Event) => void): AgreementsContextMenuItem {
    return Object.assign(new AgreementsContextMenuItem(), this, {command: command});
  }

}


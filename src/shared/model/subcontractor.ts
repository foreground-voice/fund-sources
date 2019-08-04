export class Subcontractor {

  id?: number;
  fullName: string;
  fullNameEn?: string;
  shortName?: string;
  subcontractorType: string;
  taxpayerCode?: string;
  rkpoRegisterNumber?: string;
  inn: string;
  kpp?: string;
  okopfId?: number;
  okopfName?: string;
  locationRf?: string;
  countryCode?: number;
  countryName?: string;
  foreignLocation?: string;
  name?: string;
  middleName?: string;
  surname?: string;
  email?: string;
  phoneNum?: string;
  additionalPhoneNumber?: string;
  registrationDate: Date;

  constructor(fullName: string, name: string, surname: string, inn: string, registrationDate: Date, subcontractorType: string) {
    // Обязательные поля
    this.fullName = fullName;
    this.name = name;
    this.surname = surname;
    this.inn = inn;
    this.registrationDate = registrationDate;
    this.subcontractorType = subcontractorType;
  }
}

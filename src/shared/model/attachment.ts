export class Attachment {
  /*закоментировано, то, что вроде бы, не должно использоваться на фронте но есть БД*/
  id: number = null;
  // private String guid;
  contentUid: string = null;
  attachmentType: string = null; // скан, документ...
  // contentId: number;
  createDate: Date = null;
  description: string = null;
  fileName: string = null;
  contentType: string = null;
  fileSize: number = null;
  publishDate?: Date = null;
  // creatorUserId: number;
  status: string = null;
  // fileSizeInfo: string;
  // antivirusCheckStatus: string;
  // parent: Attachment;
  externalUrl: string = null;
  // creatorUserLogin: string;
  // gost34Hash: string;
  // fileType: string;
  // documentName: string;
  // FileSizeWithDimention: string;
  // cryptoSigns: CryptoSign[];
  cryptoSigns?: string[] = []; // todo заменить на класс CryptoSign
}

import {Attachment} from '../attachment';

export class AttachmentsTabDto {
  linkedEntityId?: number;
  linkedEntityType?: string;
  status?: string;
  attachments?: Attachment[];
}

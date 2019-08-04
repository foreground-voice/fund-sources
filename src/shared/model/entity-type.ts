export const EntityTypes: { [key: string]: EntityType } = {
  agreementInfo: {
    name: 'agreementInfo',
    className: 'demo.model.entity.AgreementsInfo'
  },
  agreementProcedure: {
    name: 'agreementProcedure',
    className: 'demo.model.entity.AgreementsProcedure'
  },
  agreementProtocol: {
    name: 'agreementProtocol',
    className: 'demo.model.entity.AgreementsProtocol'
  },
  agreementProcedureCancel: {
    name: 'agreementProcedureCancel',
    className: 'demo.model.entity.AgreementsProceduresCancel'
  }  
};

export interface EntityType {
  name: string;
  className: string;
}


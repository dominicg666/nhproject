export interface profilewizard {
    legaldata?: (LegaldataEntity)[] | null;
    mtdata?: (MtdataEntity)[] | null;
    skilldata?: (SkilldataEntity)[] | null;
    titledata?: (TitledataEntity)[] | null;
    lookupdata?: (LookupdataEntityOrAreyouamemberdataEntity)[] | null;
    atraindata?: (null)[] | null;
    docdata?: (DocdataEntity)[] | null;
    refdatas?: (RefdatasEntity)[] | null;
    areyouamemberdata?: (LookupdataEntityOrAreyouamemberdataEntity)[] | null;
    workexpdata?: (WorkexpdataEntity)[] | null;
    mtraningdatedata?: (MtraningdatedataEntity)[] | null;
    expdatedatafrom?: (ExpdatedatafromEntity)[] | null;
    expdatedatato?: (ExpdatedatatoEntity)[] | null;
    dbsdata?: (DbsdataEntity)[] | null;
  }
  export interface DbsdataEntity {
    dbsupdateservicequestion: number;
    dbsservicenumber: string;
  }
  
  export interface LegaldataEntity {
    leagelid: number;
    userid: number;
    nmcregisternumber: string;
    revalidationdone: number;
    experianceprofile: string;
    nmcexpdate: string;
    revalidationdate: string;
    membershipregexpdate: string;
    membershipregistrationnum: string;
    areyouamember: number;
  }
  export interface MtdataEntity {
    trainingid: number;
    trainingname: string;
    validitydate: string;
    days: number;
    usertype: number;
  }
  export interface SkilldataEntity {
    skillid: number;
    skillname: string;
    skillminval: number;
    skillmaxval: number;
    skillcolor?: string | null;
    usertype: number;
  }
  export interface TitledataEntity {
    titleid: number;
    jobtitle: string;
    type: number;
    enteredby: number;
    created_at?: null;
    updated_at?: null;
    flag: number;
  }
  export interface LookupdataEntityOrAreyouamemberdataEntity {
    id: number;
    name: string;
    type: string;
    lookid: number;
    lookidname?: null;
    flag: number;
  }
  export interface DocdataEntity {
    docid: number;
    userid: number;
    filepath: string;
    filetype: string;
    filename: string;
    extention: string;
    contenttype: string;
    enteredby: number;
    created_at: string;
    updated_at: string;
    flag: number;
  }
  export interface RefdatasEntity {
    refname: string;
    refemail: string;
    refphone: string;
    referenceid: number;
    mailsenton: string;
  }
  export interface WorkexpdataEntity {
    workexpid: number;
    orgname: string;
    periodfromid: number;
    periodtoid: number;
    experience: string;
    periodfromidname: string;
    periodtoidname?: null;
  }
  export interface MtraningdatedataEntity {
    formatedserverdate: string;
    dayid: number;
  }
  export interface ExpdatedatafromEntity {
    yearnonth: string;
    dayid: number;
  }
  export interface ExpdatedatatoEntity {
    yearnonth: string;
    dayid: number | string;
  }
  
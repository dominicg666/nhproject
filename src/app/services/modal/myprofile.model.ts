export interface myProfile {
  userdata: Userdata;
  bank_data?: (null)[] | null;
  mtrainingdata?: (MtrainingdataEntity)[] | null;
  skills_data?: (SkillsDataEntity)[] | null;
  titledata?: (TitledataEntity)[] | null;
  legaldata?: (LegaldataEntity)[] | null;
  lookupdata?: (LookupdataEntityOrAreyouamemberdataEntity)[] | null;
  traingingdata?: (null)[] | null;
  docdata?: (DocdataEntity)[] | null;
  refdatas?: (RefdatasEntity)[] | null;
  blockednhdata?: (null)[] | null;
  areyouamemberdata?: (LookupdataEntityOrAreyouamemberdataEntity)[] | null;
  workexpdata?: (WorkexpdataEntity)[] | null;
  userapprovalstatus:(Userapprovalstatus);
  userreviews?: (UserreviewsEntity)[] | null;
}


export interface UserreviewsEntity {
  rateid: number;
  nurseid: number;
  nursinghomeid: number;
  value: number;
  comments: string;
  created_on: string;
  nursinghomename: string;
  nurshinghomeimage: string;
  nusinghomebgimage: string;
}

export interface Userapprovalstatus {
  userstatustype: number;
  userstatus: string;
}

export interface Userdata {
  id: number;
  nuringhomeid?: null;
  franchiseid: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  phoneotp: number;
  emailotp: number;
  isphoneverified: number;
  isemailverified: number;
  nationality: string;
  gender: string;
  usertype: string;
  usergrade: number;
  dateofbirth: string;
  passwordchanged: number;
  postcode: string;
  postcodelinkid?: null;
  cityname: string;
  jobtitle?: null;
  companyname?: null;
  latitude: number;
  longitude: number;
  numberofhomes?: null;
  address1: string;
  address2: string;
  nursinghomename?: null;
  myimage: string;
  bgimage: string;
  businessname?: null;
  registeredaddress?: null;
  nhprofiledata?: null;
  district: string;
  county: string;
  country: string;
  lastlogintime?: null;
  loginyet: number;
  myworkradious?: null;
  profilepercentage: number;
  dbsupdateservicequestion?: null;
  dbsservicenumber?: null;
  kycdone: number;
  kycupdatedby: number;
  kycupdated_at?: null;
  userratevalue?: null;
  userstatus: number;
  enteredby: number;
  created_at: string;
  updated_at: string;
  flag: number;
  activetab: number;
}
export interface MtrainingdataEntity {
  trainingid: number;
  trainingname: string;
  validitydate: number;
  validitydatetext:string;
}
export interface SkillsDataEntity {
  skillid: number;
  skillname: string;
  skillminval: number;
  skillmaxval: number;
  skillcolor?: string | null;
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
  userdefinedname:string;
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

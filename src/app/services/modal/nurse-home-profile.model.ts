export interface NurseHomeProfile {
  userdata: Userdata;
  skilldata?: (null)[] | null;
  ssdatas?: (SsdatasEntity)[] | null;
  findatas?: (FindatasEntity)[] | null;
  docdata?: (DocdataEntityOrDirdocdataEntity)[] | null;
  dirdatas?: (DirdatasEntity)[] | null;
  dirdocdata?: (DocdataEntityOrDirdocdataEntity)[] | null;
}
export interface Userdata {
  franchiseid: number;
  id: number;
  emaildisp: string;
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
  dateofbirth?: null;
  nationality?: null;
  usertype: string;
  postcode: string;
  district: string;
  cityname: string;
  address1: string;
  address2: string;
  latitude: number;
  longitude: number;
  county: string;
  country: string;
  myimage: string;
  bgimage: string;
  lastseen: string;
  email: string;
  password: string;
  usertypeid: string;
  myworkradious: number;
  nursinghomename: string;
  businessname: string;
  registeredaddress: string;
  profilepercentage: string;
  userstatus: number;
  lastlogintime: string;
  kycdonestatus: string;
  loginyet: number;
  nhprofiledata: string;
  userratevalue?: null;
  authpersonname: string;
  businesstelephone: string;
  countryofincorporation: string;
  countryofoperation: string;
  dateofincorporation: string;
  designation: string;
  difftraidingaddress: string;
  emailaddress: string;
  legalform: string;
  legalname: string;
  natureofbusiness: string;
  registrationno: string;
  telephoneoffice: string;
  tradingname: string;
  websiteaddress: string;
}
export interface SsdatasEntity {
  username: string;
  id: number;
  nursinghomename: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  userstatusname: string;
  userstatus: number;
  usertype: string;
}
export interface FindatasEntity {
  username: string;
  id: number;
  nursinghomename: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  userstatusname: string;
  userstatus?: number | null;
  usertype: string;
}
export interface DocdataEntityOrDirdocdataEntity {
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
export interface DirdatasEntity {
  dirid: number;
  nhid: number;
  directorname: string;
  designation: string;
  nationality: string;
  dirdateofbirth: string;
  directoraddress: string;
  created_at: string;
  updated_at: string;
  entered_by: number;
  flag: number;
}

export interface WorksDetails {
  avaiableworksdata?: (AvaiableworksdataEntity)[] | null;
}
export interface AvaiableworksdataEntity {
  row_number: number;
  jobid: number;
  bgimage: string;
  addresses: string;
  jobname: string;
  monthname: string;
  dayname: number;
  jobshift: string;
  shiftrate: string;
  hourlyrate: string;
  confirmmessage: string;
  shiftpay: string;
  nursesreqnow: number;
  jobnumber: string;
  shiftremarks: string;
  gradename: string;
  nursesreq: number;
  shiftstartdatetime: string;
  shiftenddatetime: string;
  shiftstartshorttime: string;
  shiftendshorttime: string;
  jobshifthours: string;
  nursinghomename: string;
  shiftname: string;
  jobstartdate: string;
  nhaddresses: string;
  showmessage: string;
  distance: number;
  cityname: string;
  myimage: string;
  nhprofiledata: string;
  cancellationmsg:string;
  nursinghomephone:string;
}

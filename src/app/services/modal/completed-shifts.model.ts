export interface CompletedShift {
  myshiftstatistics?: (MyshiftstatisticsEntity)[] | null;
  jobdata?: (JobdataEntity)[] | null;
}
export interface MyshiftstatisticsEntity {
  TOTALBOOKEDHOURS: number;
  TOTALWORKEDHOURS: number;
  TOTALBOOKEDAMOUNT: number;
  TOTALWORKEDAMOUNT: number;
}
export interface JobdataEntity {
  row_number: number;
  jobid: number;
  nurseuserid: number;
  jobname: string;
  jobtype: string;
  nursesreq: number;
  shiftid: number;
  hourlyrate: string;
  shiftrate: string;
  jobstartdate: string;
  jobworkid: number;
  nhuserid: number;
  jobenddate: string;
  jobdate: string;
  jobstarttime: string;
  jobcreateddatetime: string;
  jobstatusname: string;
  theame: string;
  jobapproved: number;
  monthname: string;
  dayname: number;
  mainstatustype: number;
  mainstatus: string;
  bookstatus: string;
  booktheme: string;
  nursinghomename: string;
  imagepath: string;
  shiftname: string;
  myimage: string;
}

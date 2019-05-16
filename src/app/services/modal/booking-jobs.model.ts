export interface BookingJobs {
    shiftjobdatas?: (ShiftjobdatasEntity)[] | null;
  }
  export interface ShiftjobdatasEntity {
    row_number: number;
    jobid: number;
    shiftid: number;
    hotshift: number;
    jobnumber: string;
    usertype: number;
    userid: number;
    nursesreq: number;
    jobshifthours: string;
    hourlyrate: number;
    shiftname: string;
    jobstartdate: string;
    jobenddate: string;
    jobdate: string;
    jobdatename: string;
    jobstarttime: string;
    shiftstartdatetime: string;
    shiftenddatetime: string;
    shiftremarks?: null;
    grade: string;
    jobstatus: string;
    theame: string;
    bookstatus: string;
    booktheme: string;
    created_at: string;
    rowcolor?: null;
    shiftgradename: string;
  }
  
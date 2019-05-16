export interface AllJobs {
    shiftdatedata?: (ShiftdatedataEntity)[] | null;
  }
  export interface ShiftdatedataEntity {
    formateddate: string;
    formatedserverdate: string;
    dayid: number;
    datevalue: string;
    datename: string;
  }
  
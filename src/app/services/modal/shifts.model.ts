export interface Data {
  shiftmasterdata?: (ShiftList)[] | null;
  hotshiftrate?: (HotshiftrateEntity)[] | null;
}

export interface ShiftTime {
    id: number;
    name: string;
    type: string;
    lookid: number;
    lookidname: string;
    flag: number;
  }
  export interface ShiftList {
    shiftmid: number;
    shiftname: string;
    shiftstarttimename: string;
    shiftendtimename: string;
    shifttimename: string;
    shiftstarttimeid: number;
    shiftendtimeid: number;
    totalHours: string;
  } 

  export interface HotshiftrateEntity {
    hotshiftamount: string;
    effectivedate: string;
    todaysdate: string;
    USERID: number;
  }
  
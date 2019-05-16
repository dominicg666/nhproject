export interface ShiftManager {
    shiftmanagerdata?: (ShiftmanagerdataEntity)[] | null;
  }
  export interface ShiftmanagerdataEntity {
    shiftid: number;
    shiftmid: number;
    shiftname: string;
    shiftstarttimeid: number;
    shiftendtimeid: number;
    effectivedate: string;
    nurseorhca: number;
    hotshiftamount: string;
    grade: number;
    shifttimename: string;
    usergradetypename: string;
    fridaynightrate: string;
    normalhoulyrate: string;
    shiftstarttimename: string;
    shiftendtimename: string;
    satudaysundaynight: string;
    saturdaysundayday: string;
  }
  
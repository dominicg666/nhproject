export interface completedShift_NH {
    jobdatas?: (JobdatasEntity)[] | null;
}
export interface JobdatasEntity {
    row_number: number;
    jobnumber: string;
    jobworkid: number;
    jobid: number;
    nurseid: number;
    nursename: string;
    nurseemail: string;
    nursephone: string;
    nhphone: string;
    nhemail: string;
    staffgrade: string;
    imagepath: string;
    jobcompleted: number;
    extrajobhour: string;
    extrahourtime: string;
    nursinghomename: string;
    nurseuserid: number;
    jobshift: string;
    shiftid: number;
    shiftrate: string;
    shiftstartdatetime: string;
    shiftstarttime: string;
    shiftendtime: string;
    nurseimagepath: string;
    jobstartdate: string;
    jobenddate: string;
    jobdate: string;
    monthname: string;
    dayname: number;
    mainstatus: string;
    mainstatustype:number;
}

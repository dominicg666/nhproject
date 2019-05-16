export interface upcomingShift_NH {
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
    bookedby: string;
    imagepath: string;
    staffgrade: string;
    jobcompleted?: null;
    extrajobhour: string;
    extrahourtime: string;
    nursinghomename: string;
    nurseuserid: number;
    jobshift: string;
    shiftid: number;
    shiftrate: string;
    shiftstartdatetime: string;
    nurseimagepath: string;
    jobstartdate: string;
    jobenddate: string;
    jobdate: string;
    mainstatus: string;
    isacceptedbutton:boolean;
    onthewaybutton:boolean;
    confirmedshiftbutton:boolean;
    cancelafter12hrsbtn:boolean;
}

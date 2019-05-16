export interface HolidaysList {
    onholidays?: (OnholidaysEntity)[] | null;
  }
  export interface OnholidaysEntity {
    holidaysid: number;
    userid: number;
    fromdate: string;
    todate: string;
    enteredby: number;
    created_at: string;
    updated_at: string;
    flag: number;
  }
  
export interface ChatInbox {
    chatdata?: (ChatdataEntity)[] | null;
  }
  export interface ChatdataEntity {
    row_number: number;
    id: number;
    username: string;
    areamanager: string;
    myimage: string;
    email: string;
    msgtime: string;
    msgdata: string;
    timeago:string;
  }
  
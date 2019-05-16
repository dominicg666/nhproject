export interface ChatList {
    chatdata?: (ChatdataEntity)[] | null;
  }
  export interface ChatdataEntity {
    userstoimage: string;
    usersbyimage: string;
    usersbyname: string;
    userstoname: string;
    chatdetails: string;
    created_date: string;
    created_time: string;
    enteredto: string;
    enteredby: string;
    created_datetime: string;
  }
  
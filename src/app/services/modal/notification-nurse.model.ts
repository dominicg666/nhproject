export interface NotificationNurse {
    notifications?: (NotificationsEntity)[] | null;
    unreadcount:number;
  }
  export interface NotificationsEntity {
    id: number;
    title: string;
    message: string;
    one_signal_id: string;
    user_id: number;
    created_at: string;
    updated_at?: null;
    data: string;
    isonsignal: number;
    isread:number;
  }
  
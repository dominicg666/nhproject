export interface ContactsModel {
    _objectInstance: ObjectInstance;
    rawId: string;
  }
  export interface ObjectInstance {
    id: string;
    rawId?: null;
    displayName: string;
    name: Name;
    nickname?: null;
    phoneNumbers?: (PhoneNumbersEntity)[] | null;
    emails?: null;
    addresses?: null;
    ims?: null;
    organizations?: null;
    birthday?: null;
    note?: null;
    photos?: null;
    categories?: null;
    urls?: null;
  }
  export interface Name {
    familyName: string;
    givenName: string;
    formatted: string;
  }
  export interface PhoneNumbersEntity {
    id: string;
    pref: boolean;
    value: string;
    type: string;
  }
  
export interface Albums {
  userId: number;
  id: number;
  title: string;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}
export interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface idParams {
  id: any;
  albumid: any;
}

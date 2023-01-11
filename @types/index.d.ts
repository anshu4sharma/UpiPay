declare interface FetchedLinks {
  limit: number;
  page: number;
  totalLinks: number;
  totalPages: number;
  Links: Link[];
}

declare interface Link {
  amount: number;
  createdAt: string;
  description: string;
  merchantId: string;
  name: string;
  uid: string;
  updatedAt: string;
  upiId: string;
  __v: number;
  _id: string;
}

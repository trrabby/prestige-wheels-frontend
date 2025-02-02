export interface ICars {
  key?: string;
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  imgUrl: string[];
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Author {
  _id: string;
  name: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt: string;
}

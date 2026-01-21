export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface Transaction {
  id: number;
  userId: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface Budgets {
  [category: string]: number;
}

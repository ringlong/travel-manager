import { create } from "zustand";

type Account = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

type AccountStore = {
  accounts: Account[];
  addAccount: (account: Omit<Account, "id" | "createdAt">) => void;
  updateAccount: (id: number, account: Partial<Account>) => void;
  deleteAccount: (id: number) => void;
};

const mockAccounts = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    status: "活跃",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "操作员",
    status: "非活跃",
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "操作员",
    status: "活跃",
    createdAt: "2024-01-03",
  },
];

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: mockAccounts,
  addAccount: (account) =>
    set((state) => ({
      accounts: [
        ...state.accounts,
        {
          ...account,
          id: Math.max(...state.accounts.map((a) => a.id)) + 1,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ],
    })),
  updateAccount: (id, account) =>
    set((state) => ({
      accounts: state.accounts.map((a) =>
        a.id === id ? { ...a, ...account } : a
      ),
    })),
  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
    })),
}));

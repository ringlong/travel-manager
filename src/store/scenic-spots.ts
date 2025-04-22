import { create } from "zustand";

export interface ScenicSpot {
  id: number;
  name: string;
  country: string;
  city: string;
  type: string;
  rating: number;
  visitCount: string;
  status: string;
}

type ScenicSpotStore = {
  scenicSpots: ScenicSpot[];
  addScenicSpot: (spot: Omit<ScenicSpot, "id">) => void;
  updateScenicSpot: (id: number, spot: Partial<ScenicSpot>) => void;
  deleteScenicSpot: (id: number) => void;
};

const mockScenicSpots = [
  {
    id: 1,
    name: "故宫博物院",
    country: "中国",
    city: "北京",
    type: "文化古迹",
    rating: 5,
    visitCount: "800万/年",
    status: "开放",
  },
  {
    id: 2,
    name: "埃菲尔铁塔",
    country: "法国",
    city: "巴黎",
    type: "地标建筑",
    rating: 5,
    visitCount: "700万/年",
    status: "开放",
  },
  {
    id: 3,
    name: "泰姬陵",
    country: "印度",
    city: "阿格拉",
    type: "文化古迹",
    rating: 5,
    visitCount: "600万/年",
    status: "开放",
  },
];

export const useScenicSpotStore = create<ScenicSpotStore>((set) => ({
  scenicSpots: mockScenicSpots,
  addScenicSpot: (spot) =>
    set((state) => ({
      scenicSpots: [
        ...state.scenicSpots,
        {
          ...spot,
          id: Math.max(...state.scenicSpots.map((s) => s.id)) + 1,
        },
      ],
    })),
  updateScenicSpot: (id, spot) =>
    set((state) => ({
      scenicSpots: state.scenicSpots.map((s) =>
        s.id === id ? { ...s, ...spot } : s
      ),
    })),
  deleteScenicSpot: (id) =>
    set((state) => ({
      scenicSpots: state.scenicSpots.filter((s) => s.id !== id),
    })),
}));

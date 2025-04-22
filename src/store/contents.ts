import { create } from 'zustand';

interface Content {
  id: number;
  title: string;
  content: string;
  publishTime: string;
  author: string;
  views: number;
  comments: number;
  status: 'published' | 'draft' | 'archived';
  images?: string[];
  text?: string;
}

interface ContentStore {
  contents: Content[];
  addContent: (content: Partial<Content>) => void;
  deleteContents: (ids: number[]) => void;
  updateContent: (id: number, content: Partial<Content>) => void;
}

// 初始模拟数据
const initialContents = [
  {
    id: 1,
    title: '巴黎铁塔的浪漫之旅',
    content: '巴黎铁塔不仅是巴黎的象征，更是浪漫的代名词...',
    publishTime: '2024-03-15 14:30',
    author: 'travel_guide',
    views: 1234,
    comments: 45,
    status: 'published',
  },
  {
    id: 2,
    title: '探索印度泰姬陵的神秘之美',
    content: '泰姬陵是印度最著名的建筑之一，它不仅是一座陵墓...',
    publishTime: '2024-03-14 09:15',
    author: 'culture_explorer',
    views: 2156,
    comments: 78,
    status: 'published',
  },
] as Content[];

export const useContentStore = create<ContentStore>((set) => ({
  contents: initialContents,
  addContent: (content) => 
    set((state) => ({
      contents: [
        {
          id: Math.max(0, ...state.contents.map(c => c.id)) + 1,
          title: content.text?.split('\n')[0]?.slice(0, 50) || '新内容',
          publishTime: new Date().toLocaleString(),
          views: 0,
          comments: 0,
          status: 'draft',
          ...content,
        } as Content,
        ...state.contents,
      ],
    })),
  deleteContents: (ids) =>
    set((state) => ({
      contents: state.contents.filter((content) => !ids.includes(content.id)),
    })),
  updateContent: (id, updatedContent) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === id ? { ...content, ...updatedContent } : content
      ),
    })),
})); 
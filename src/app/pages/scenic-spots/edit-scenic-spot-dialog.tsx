'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ScenicSpot = {
  id?: number;
  name: string;
  country: string;
  city: string;
  type: string;
  rating: number;
  visitCount: string;
  status: string;
};

type EditScenicSpotDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scenicSpot?: ScenicSpot;
  onSubmit: (data: ScenicSpot) => void;
};

const initialFormData: ScenicSpot = {
  name: '',
  country: '',
  city: '',
  type: '',
  rating: 5,
  visitCount: '',
  status: '开放',
};

export default function EditScenicSpotDialog({
  open,
  onOpenChange,
  scenicSpot,
  onSubmit,
}: EditScenicSpotDialogProps) {
  const [formData, setFormData] = useState<ScenicSpot>(initialFormData);

  useEffect(() => {
    if (scenicSpot) {
      setFormData(scenicSpot);
    } else {
      setFormData(initialFormData);
    }
  }, [scenicSpot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!scenicSpot) {
      setFormData(initialFormData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{scenicSpot ? '编辑景区' : '新增景区'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">景区名称</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>所属国家</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="选择国家" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="中国">中国</SelectItem>
                <SelectItem value="法国">法国</SelectItem>
                <SelectItem value="印度">印度</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>所在城市</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData({ ...formData, city: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="选择城市" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="北京">北京</SelectItem>
                <SelectItem value="巴黎">巴黎</SelectItem>
                <SelectItem value="阿格拉">阿格拉</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>景点类型</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="文化古迹">文化古迹</SelectItem>
                <SelectItem value="地标建筑">地标建筑</SelectItem>
                <SelectItem value="自然景观">自然景观</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">评分</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitCount">年访问量</Label>
            <Input
              id="visitCount"
              value={formData.visitCount}
              onChange={(e) => setFormData({ ...formData, visitCount: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>状态</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="开放">开放</SelectItem>
                <SelectItem value="关闭">关闭</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit">确认</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
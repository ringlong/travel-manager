'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EditScenicSpotDialog from './edit-scenic-spot-dialog';
import { useScenicSpotStore } from '@/store/scenic-spots';

export default function ScenicSpotsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<any>();

  const { scenicSpots, addScenicSpot, updateScenicSpot } = useScenicSpotStore();

  // 过滤景区列表
  const filteredSpots = scenicSpots.filter(spot => {
    const matchesSearch = 
      spot.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !countryFilter || spot.country === countryFilter;
    const matchesCity = !cityFilter || spot.city === cityFilter;
    const matchesType = !typeFilter || spot.type === typeFilter;

    return matchesSearch && matchesCountry && matchesCity && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">景区管理</h1>
        <Button onClick={() => {
          setEditingSpot(undefined);
          setDialogOpen(true);
        }}>新增景区</Button>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <Input
          placeholder="搜索景区名称"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="国家" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部国家</SelectItem>
            <SelectItem value="中国">中国</SelectItem>
            <SelectItem value="法国">法国</SelectItem>
            <SelectItem value="印度">印度</SelectItem>
          </SelectContent>
        </Select>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="城市" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部城市</SelectItem>
            <SelectItem value="北京">北京</SelectItem>
            <SelectItem value="巴黎">巴黎</SelectItem>
            <SelectItem value="阿格拉">阿格拉</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="文化古迹">文化古迹</SelectItem>
            <SelectItem value="地标建筑">地标建筑</SelectItem>
            <SelectItem value="自然景观">自然景观</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>景区名称</TableHead>
              <TableHead>所属国家</TableHead>
              <TableHead>所在城市</TableHead>
              <TableHead>景点类型</TableHead>
              <TableHead>评分</TableHead>
              <TableHead>年访问量</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpots.map((spot) => (
              <TableRow key={spot.id}>
                <TableCell>{spot.name}</TableCell>
                <TableCell>{spot.country}</TableCell>
                <TableCell>{spot.city}</TableCell>
                <TableCell>{spot.type}</TableCell>
                <TableCell>{spot.rating}星</TableCell>
                <TableCell>{spot.visitCount}</TableCell>
                <TableCell>{spot.status}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingSpot(spot);
                      setDialogOpen(true);
                    }}
                  >
                    编辑
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditScenicSpotDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        scenicSpot={editingSpot}
        onSubmit={(data) => {
          if (editingSpot) {
            updateScenicSpot(editingSpot.id, data);
          } else {
            addScenicSpot(data);
          }
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
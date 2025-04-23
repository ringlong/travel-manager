'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useScenicSpotStore } from '@/store/scenic-spots';
import { Card } from '@/components/ui/card';
import { Maximize2 } from 'lucide-react';

interface ContentGenerationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerated?: (content: { text: string; images: string[] }) => void;
}

export function ContentGenerationDialog({
  open,
  onOpenChange,
  onGenerated,
}: ContentGenerationDialogProps) {
  const [selectedSpot, setSelectedSpot] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    text: string;
    images: string[];
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const scenicSpots = useScenicSpotStore((state) => state.scenicSpots);

  // 监听对话框打开状态，重置所有状态
  useEffect(() => {
    if (open) {
      setSelectedSpot('');
      setPrompt('');
      setIsLoading(false);
      setGeneratedContent(null);
      setPreviewImage(null);
    }
  }, [open]);

  const handleGenerate = async () => {
    setIsLoading(true);
    // 模拟生成内容的过程
    setTimeout(() => {
      const content = {
        text: '这是一段生成的示例内容，描述了景区的特色和亮点。这里是具体的景点描述，包含了历史背景、文化特色、建筑风格等详细信息。游客可以在这里感受到独特的文化氛围和震撼的视觉体验。#旅行 #景点推荐 #风景',
        images: [
          'https://picsum.photos/800/600?random=1',
          'https://picsum.photos/800/600?random=2',
          'https://picsum.photos/800/600?random=3',
        ],
      };
      setGeneratedContent(content);
      setIsLoading(false);
    }, 2000);
  };

  const handleUseContent = () => {
    if (onGenerated && generatedContent) {
      onGenerated(generatedContent);
    }
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>生成内容</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-6 rounded-lg">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>选择景区</Label>
                  <Select value={selectedSpot} onValueChange={setSelectedSpot}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择景区" />
                    </SelectTrigger>
                    <SelectContent>
                      {scenicSpots.map((spot) => (
                        <SelectItem key={spot.id} value={String(spot.id)}>
                          {spot.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>提示词</Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="请输入提示词"
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!selectedSpot || !prompt || isLoading}
                  className="w-full"
                >
                  {isLoading ? '生成中...' : '生成内容'}
                </Button>
              </div>
            </div>

            {generatedContent && (
              <Card className="p-6 space-y-6">
                <h3 className="text-lg font-semibold">生成结果</h3>
                
                {/* 图片展示区 */}
                <div className="grid grid-cols-3 gap-4">
                  {generatedContent.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] group cursor-pointer"
                      onClick={() => setPreviewImage(image)}
                    >
                      <img
                        src={image}
                        alt={`图片 ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 文字展示区 */}
                <div className="prose max-w-none p-4 bg-muted rounded-lg">
                  {generatedContent.text}
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={handleGenerate}>
                    重新生成
                  </Button>
                  <Button onClick={handleUseContent}>使用此内容</Button>
                </div>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 图片预览对话框 */}
      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="sr-only">图片预览</DialogTitle>
          </DialogHeader>
          <img
            src={previewImage || ''}
            alt="预览图片"
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
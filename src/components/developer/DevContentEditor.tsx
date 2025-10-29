import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { 
  ContentManager, 
  AnnouncementContent, 
  StatContent, 
  DepartmentContent, 
  HeroContent 
} from '../../utils/contentManager';

interface DevContentEditorProps {
  contentType: 'announcements' | 'stats' | 'departments' | 'hero';
  onClose: () => void;
}

export function DevContentEditor({ contentType, onClose }: DevContentEditorProps) {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [content, setContent] = useState<any[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = () => {
    switch (contentType) {
      case 'announcements':
        setContent(ContentManager.getAnnouncements());
        break;
      case 'stats':
        setContent(ContentManager.getStats());
        break;
      case 'departments':
        setContent(ContentManager.getDepartments());
        break;
      case 'hero':
        setHeroContent(ContentManager.getHeroContent());
        break;
    }
  };

  const saveContent = () => {
    try {
      switch (contentType) {
        case 'announcements':
          ContentManager.saveAnnouncements(content);
          break;
        case 'stats':
          ContentManager.saveStats(content);
          break;
        case 'departments':
          ContentManager.saveDepartments(content);
          break;
        case 'hero':
          if (heroContent) {
            ContentManager.saveHeroContent(heroContent);
          }
          break;
      }
      
      toast.success('Content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingItem(getEmptyItem());
  };

  const getEmptyItem = () => {
    switch (contentType) {
      case 'announcements':
        return {
          title: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          priority: 'medium',
          visible: true
        };
      case 'stats':
        return {
          label: '',
          value: '',
          icon: 'Users',
          visible: true
        };
      case 'departments':
        return {
          name: '',
          description: '',
          courses: [],
          image: '',
          visible: true
        };
      default:
        return {};
    }
  };

  const handleSaveItem = () => {
    if (!editingItem) return;

    if (showAddForm) {
      const newContent = [...content];
      const newItem = { 
        ...editingItem, 
        id: `${contentType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
      };
      newContent.push(newItem);
      setContent(newContent);
      setShowAddForm(false);
    } else {
      const newContent = content.map(item => 
        item.id === editingItem.id ? editingItem : item
      );
      setContent(newContent);
    }
    
    setEditingItem(null);
    toast.success(showAddForm ? 'Item added!' : 'Item updated!');
  };

  const handleDeleteItem = (id: string) => {
    const newContent = content.filter(item => item.id !== id);
    setContent(newContent);
    toast.success('Item deleted!');
  };

  const toggleVisibility = (id: string) => {
    const newContent = content.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    );
    setContent(newContent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Content Editor</h2>
          <div className="flex items-center gap-2">
            <Button onClick={saveContent} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save All
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center py-12">
            <Edit3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Management</h3>
            <p className="text-gray-600">This feature is coming soon!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
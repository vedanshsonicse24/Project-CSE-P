import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { subjects } from './data';
import { TimetableCell } from './types';

interface EditableCellProps {
  cell: TimetableCell;
  isEditMode: boolean;
  onUpdate: (subject: string, teacher: string, type: 'theory' | 'lab' | 'library' | 'break') => void;
}

export function EditableCell({ cell, isEditMode, onUpdate }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getCellColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'bg-[#fefce8]';
      case 'library':
      case 'break':
        return 'bg-[#eff6ff]';
      default:
        return 'bg-[#fafaf9]';
    }
  };

  const getHoverColor = (type: string) => {
    switch (type) {
      case 'lab':
        return 'hover:bg-[#fef9c3]';
      case 'library':
      case 'break':
        return 'hover:bg-[#dbeafe]';
      default:
        return 'hover:bg-[#f5f5f4]';
    }
  };

  const subject = subjects.find(s => s.code === cell.subject);

  if (isEditMode && isEditing) {
    return (
      <div className={`p-3 min-h-[80px] ${getCellColor(cell.type)}`}>
        <Select
          value={cell.subject}
          onValueChange={(value) => {
            const selectedSubject = subjects.find(s => s.code === value);
            if (selectedSubject) {
              onUpdate(value, selectedSubject.faculty, selectedSubject.type);
              setIsEditing(false);
            }
          }}
        >
          <SelectTrigger className="w-full bg-white h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((sub) => (
              <SelectItem key={sub.code} value={sub.code}>
                {sub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div
      className={`p-3 min-h-[80px] transition-all duration-200 ${getCellColor(cell.type)} ${
        isEditMode ? `cursor-pointer ${getHoverColor(cell.type)}` : ''
      }`}
      onClick={() => isEditMode && setIsEditing(true)}
    >
      <div className="text-sm" style={{ color: '#1c2e4a' }}>
        {subject?.name || cell.subject}
      </div>
      {cell.teacher !== '-' && (
        <div className="text-xs mt-1" style={{ color: '#6b7280' }}>
          {cell.teacher}
        </div>
      )}
    </div>
  );
}

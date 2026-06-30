import React from 'react';
import type { TemplateField } from '../../types/promptforge';

interface FormFieldProps {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
}

export default function FormField({ field, value, onChange }: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const charCount = value.length;
  const isNearLimit = field.maxLength && charCount > field.maxLength * 0.85;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.maxLength && (
          <span className={`text-xs tabular-nums ${isNearLimit ? 'text-orange-600' : 'text-gray-500'}`}>
            {charCount} / {field.maxLength}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">{field.tooltip}</p>

      {field.inputType === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          rows={5}
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 resize-y min-h-[110px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
        />
      )}
    </div>
  );
}
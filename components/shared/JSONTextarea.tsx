'use client';

import { useState, useCallback, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';

export interface JSONTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accept?: string;
  label?: string;
  className?: string;
  minHeight?: string;
  showLineNumbers?: boolean;
  disabled?: boolean;
  onFileLoaded?: (filename: string) => void;
  readOnly?: boolean;
}

export function JSONTextarea({
  value,
  onChange,
  placeholder = 'Paste your data here or drag and drop a file...',
  accept = '.json,.txt',
  label,
  className = '',
  minHeight = 'min-h-96',
  showLineNumbers = false,
  disabled = false,
  onFileLoaded,
  readOnly = false,
}: JSONTextareaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loadedFile, setLoadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    // Only set dragging to false if we're truly leaving the element
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const readFileContent = useCallback(async (file: File) => {
    const acceptedExtensions = accept.split(',').map(ext => ext.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedExtensions.some(ext => ext === fileExtension || ext === '*')) {
      alert(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    try {
      const text = await file.text();
      onChange(text);
      setLoadedFile(file.name);
      if (onFileLoaded) {
        onFileLoaded(file.name);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to read file');
    }
  }, [accept, onChange, onFileLoaded]);

  const handleDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await readFileContent(files[0]);
    }
  }, [readFileContent]);

  const handleFileInputChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await readFileContent(files[0]);
    }
  }, [readFileContent]);

  const handleClearFile = useCallback(() => {
    setLoadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
          {!readOnly && (
            <button
              type="button"
              onClick={handleBrowseClick}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
              disabled={disabled}
            >
              Browse files
            </button>
          )}
        </div>
      )}
      
      <div
        className="relative group"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          spellCheck={false}
          className={`w-full ${minHeight} p-4 border-2 rounded-lg font-mono text-sm bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-y ${
            isDragging ? 'border-primary bg-primary/5' : ''
          } ${readOnly ? 'bg-muted cursor-default' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {/* Drag overlay */}
        {isDragging && !disabled && !readOnly && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Upload className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-primary">Drop file here</p>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Loaded file badge */}
      {loadedFile && (
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
          <span>Loaded: {loadedFile}</span>
          <button
            onClick={handleClearFile}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            aria-label="Clear file"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}


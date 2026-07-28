import { useState, useRef, DragEvent } from 'react';
import { Upload, X, FileImage, FileVideo } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  maxFiles?: number;
}

export default function FileUpload({
  onFilesSelected,
  existingFiles = [],
  maxFiles = 10,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(
      (f) =>
        f.type.startsWith('image/') || f.type.startsWith('video/')
    );
    const updated = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updated);
    onFilesSelected(updated);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected(updated);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#C20000' : 'rgba(0,0,0,0.15)'}`,
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging
            ? 'rgba(194, 0, 0, 0.04)'
            : 'rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
        }}
      >
        <Upload
          size={36}
          style={{
            color: isDragging ? '#C20000' : 'rgba(0,0,0,0.3)',
            margin: '0 auto 12px',
          }}
        />
        <p
          style={{
            color: 'rgba(0,0,0,0.7)',
            fontSize: '14px',
            marginBottom: '4px',
          }}
        >
          <span style={{ color: '#C20000', fontWeight: 600 }}>
            Click to upload
          </span>{' '}
          or drag and drop
        </p>
        <p
          style={{
            color: 'rgba(0,0,0,0.4)',
            fontSize: '12px',
          }}
        >
          Images & Videos (up to {maxFiles} files, 50MB each)
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* File previews */}
      {files.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(0,0,0,0.01)',
              }}
            >
              {/* Preview */}
              <div
                style={{
                  width: '100%',
                  height: '90px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <FileVideo
                    size={32}
                    style={{ color: 'rgba(0,0,0,0.3)' }}
                  />
                )}
              </div>

              {/* File info */}
              <div style={{ padding: '6px 8px' }}>
                <p
                  style={{
                    fontSize: '10px',
                    color: 'rgba(0,0,0,0.6)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    margin: 0,
                  }}
                >
                  {file.type.startsWith('image/') ? (
                    <FileImage size={10} style={{ marginRight: 4, display: 'inline-block', verticalAlign: 'middle' }} />
                  ) : (
                    <FileVideo size={10} style={{ marginRight: 4, display: 'inline-block', verticalAlign: 'middle' }} />
                  )}
                  <span style={{ verticalAlign: 'middle' }}>{file.name}</span>
                </p>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

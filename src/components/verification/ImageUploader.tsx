import React, { useState, useRef } from 'react';
import { UploadCloud, X, RefreshCw, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

interface ImageUploaderProps {
  onVerify: (imageDataUrl: string, fileName: string, presetCode?: string) => void;
  presetCode?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onVerify, presetCode }) => {
  const [selectedFile, setSelectedFile] = useState<{
    file: File;
    dataUrl: string;
    name: string;
    sizeFormatted: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFile = (file: File) => {
    setError(null);

    // Validate type
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a PNG, JPG, JPEG, or WEBP image.');
      return;
    }

    // Validate size
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds 5 MB limit (Current: ${formatFileSize(file.size)}).`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedFile({
        file,
        dataUrl,
        name: file.name,
        sizeFormatted: formatFileSize(file.size)
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerVerify = () => {
    if (selectedFile) {
      onVerify(selectedFile.dataUrl, selectedFile.name, presetCode);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="p-3 bg-[#FDF3F3] border border-[#F8D2D2] rounded-lg text-xs text-[#C73838] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {selectedFile ? (
        /* Image Preview & Actions State */
        <div className="bg-white rounded-xl border border-[#E4ECE7] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4ECE7]">
            <div>
              <p className="text-xs font-semibold text-[#172923] truncate max-w-xs sm:max-w-md">
                {selectedFile.name}
              </p>
              <p className="text-[11px] text-[#687871]">File size: {selectedFile.sizeFormatted}</p>
            </div>
            <button
              onClick={removeImage}
              className="text-[#687871] hover:text-[#D64B4B] p-1.5 rounded-lg hover:bg-[#FDF3F3] transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-[#F7FAF8] border border-[#E4ECE7] aspect-4/3 max-h-72 flex items-center justify-center">
            <img
              src={selectedFile.dataUrl}
              alt={selectedFile.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Choose Another Image
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleTriggerVerify}
              leftIcon={<Zap className="w-4 h-4" />}
              className="w-full sm:flex-1"
            >
              Verify Medicine
            </Button>
          </div>
        </div>
      ) : (
        /* Drop Zone / File Picker State */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all bg-white
            ${
              isDragging
                ? 'border-[#167A55] bg-[#F0F8F4]'
                : 'border-[#E4ECE7] hover:border-[#2B9C8A] hover:bg-[#F7FAF8]'
            }
          `}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h4 className="text-sm font-semibold text-[#172923]">
            Select or drag & drop medicine photo
          </h4>
          <p className="text-xs text-[#687871] mt-1 max-w-sm mx-auto leading-relaxed">
            Upload clear photographs of pharmaceutical outer cartons, blister foils, or bottle barcodes.
          </p>

          <div className="mt-4 inline-flex items-center gap-2">
            <span className="text-xs font-medium text-[#167A55] bg-[#EBF3EF] px-3 py-1.5 rounded-lg border border-[#D5E4DC]">
              Browse Files
            </span>
          </div>

          <div className="mt-5 text-[11px] text-[#9AA8A1] flex items-center justify-center gap-3">
            <span>Supported: PNG, JPG, JPEG, WEBP</span>
            <span>•</span>
            <span>Max size: 5 MB</span>
          </div>
        </div>
      )}
    </div>
  );
};

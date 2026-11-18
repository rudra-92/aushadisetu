import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, Image as ImageIcon, Zap } from 'lucide-react';
import { Button } from '../common/Button';

interface CameraScannerProps {
  onCapture: (imageDataUrl: string, detectedCodeHint?: string) => void;
  presetCode?: string;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onCapture, presetCode }) => {
  const [streamActive, setStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop video tracks when unmounting or stopping
  const stopTracks = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setCapturedImage(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not available on this device/browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to access camera device.';
      setCameraError(errorMsg);
      setStreamActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopTracks();
    }
  };

  const handleNativeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setCameraError('Image size exceeds 5 MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        setCameraError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleProceedVerification = () => {
    if (capturedImage) {
      onCapture(capturedImage, presetCode || 'AS-PAR-500-001');
    }
  };

  return (
    <div className="space-y-4">
      {/* Captured Image Preview State */}
      {capturedImage ? (
        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#172923] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#218653]" />
              Medicine Packaging Photo Captured
            </span>
            <span className="text-xs text-[#687871]">Ready for verification</span>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-black/5 aspect-4/3 max-h-80 flex items-center justify-center">
            <img
              src={capturedImage}
              alt="Medicine Package Preview"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={retakePhoto}
              leftIcon={<RefreshCw className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Retake Photo
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleProceedVerification}
              leftIcon={<Zap className="w-4 h-4" />}
              className="w-full sm:flex-1"
            >
              Verify Medicine Now
            </Button>
          </div>
        </div>
      ) : (
        /* Camera Active or Prompt State */
        <div className="bg-white rounded-xl border border-[#E4ECE7] p-4 sm:p-6 text-center">
          {streamActive ? (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-4/3 max-h-96 mx-auto flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Viewfinder Target Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-[#167A55]/80 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#167A55]/70 animate-pulse" />
                  </div>
                </div>

                {/* Controls overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = facingMode === 'environment' ? 'user' : 'environment';
                      setFacingMode(next);
                      stopTracks();
                      setTimeout(startCamera, 100);
                    }}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-xs"
                    title="Switch camera"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={capturePhoto}
                  leftIcon={<Camera className="w-5 h-5" />}
                  className="px-6"
                >
                  Capture Packaging
                </Button>
                <Button type="button" variant="ghost" onClick={stopTracks}>
                  Cancel
                </Button>
              </div>

              <p className="text-xs text-[#687871]">
                Position the barcode or 2D DataMatrix code inside the illuminated target box.
              </p>
            </div>
          ) : (
            <div className="py-6 space-y-4 max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#167A55]/10 text-[#167A55] flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-semibold text-[#172923]">
                  Scan Medicine Packaging
                </h4>
                <p className="text-xs text-[#687871] mt-1 leading-relaxed">
                  Open your camera to scan 2D DataMatrix or GS1 barcodes printed on the medicine carton or blister strip.
                </p>
              </div>

              {cameraError && (
                <div className="p-3 bg-[#FDF3F3] border border-[#F8D2D2] rounded-lg text-xs text-[#C73838] flex items-start gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{cameraError} — You can still use the device gallery/camera input below.</span>
                </div>
              )}

              <div className="flex flex-col gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={startCamera}
                  leftIcon={<Camera className="w-4 h-4" />}
                  fullWidth
                >
                  Open Live Camera
                </Button>

                {/* Device Camera Input (capture="environment") */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleNativeFileInput}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                  fullWidth
                >
                  Take Photo via Device Camera
                </Button>
              </div>

              <p className="text-[11px] text-[#9AA8A1]">
                Camera permissions are requested only when scanning.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

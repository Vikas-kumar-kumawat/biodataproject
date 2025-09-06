import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { getCroppedImg } from "../lib/cropImage";   // helper below

export default function ImageCropper({
  src,
  onDone,
  aspect = 4 / 5,
}: {
  src: string;
  onDone: (b64: string) => void;
  aspect?: number;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  const onComplete = useCallback((_, pixels) => setAreaPixels(pixels), []);

  const finish = async () => {
    if (!areaPixels) return;
    setBusy(true);
    const raw = await getCroppedImg(src, areaPixels);           // → Blob
    const file = new File([raw], "crop.jpg", { type: raw.type });
    const tiny = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });
    const b64 = await imageCompression.getDataUrlFromFile(tiny);
    onDone(b64);
    setBusy(false);
  };

  return (
    <div className="relative w-full h-96 bg-black">
      <Cropper
        image={src}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        cropShape="round"
        showGrid={false}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onComplete}
      />
      <div className="absolute bottom-4 w-full flex flex-col items-center gap-2">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(+e.target.value)}
          className="w-1/2"
        />
        <button
          onClick={finish}
          disabled={busy}
          className="bg-indigo-600 text-white px-4 py-1 rounded"
        >
          {busy ? "Processing…" : "Crop & Save"}
        </button>
      </div>
    </div>
  );
}

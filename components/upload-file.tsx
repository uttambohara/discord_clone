import { UploadDropzone } from "@/lib/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

interface UploadItemProps {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
}

const UploadItem = forwardRef(
  ({ endpoint, value, onChange }: UploadItemProps, ref) => {
    if (value) {
      return (
        <div className="relative mx-auto h-16 w-16">
          <Image
            src={value}
            alt="Server name"
            fill
            priority
            className="rounded-full"
          />
          <button
            className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 object-cover p-1"
            onClick={() => onChange("")}
          >
            <X size={16} color="white" />
          </button>
        </div>
      );
    }

    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (!res) return null;
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    );
  },
);

UploadItem.displayName = "UploadItem";
export default UploadItem;

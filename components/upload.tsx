import { UploadDropzone } from "@/lib/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

interface UploadProps {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
}

const Upload = forwardRef(({ endpoint, value, onChange }: UploadProps, ref) => {
  if (value) {
    return (
      <div className="flex items-center justify-center relative">
        <div className="relative h-16 w-16">
          <Image
            src={value}
            alt="Server"
            fill
            priority
            className="object-cover rounded-full"
          />
          <button
            className="p-1 bg-red-500 text-white absolute top-0 right-0 rounded-full"
            onClick={() => onChange("")}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      className="dark:bg-[#282b30]"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
});

Upload.displayName = "Upload";
export default Upload;

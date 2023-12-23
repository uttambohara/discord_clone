import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

type UploadItemProps = {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
};

const UploadItem = forwardRef(
  ({ endpoint, value, onChange }: UploadItemProps, ref) => {
    //
    const handleClear = () => onChange("");
    if (value) {
      return (
        <div className="relative h-16 w-16 mx-auto">
          <Image
            src={value}
            alt={"Server image..."}
            fill
            priority
            style={{ objectFit: "cover" }}
            className="rounded-full -z-10"
          />
          <button
            className="absolute bg-red-700 rounded-full top-0 right-0"
            onClick={handleClear}
          >
            <X color="white" />
          </button>
        </div>
      );
    }

    return (
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (!res) return null;
          onChange(res?.[0].url);

          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    );
  }
);

export default UploadItem;

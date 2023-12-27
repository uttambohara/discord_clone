import { UploadDropzone } from "@/lib/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

type UploadItemsProps = {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
};

const UploadItem = forwardRef(
  ({ endpoint, value, onChange }: UploadItemsProps, ref) => {
    if (value) {
      return (
        <div className="relative h-12 w-12 mx-auto">
          <Image
            src={value}
            fill
            priority
            alt={"Server image"}
            className="rounded-full -z-1"
          />
          <button
            className="h-5 w-5 absolute top-0 right-0 bg-red-700 rounded-full flex items-center justify-center shadow-md p-1"
            onClick={() => onChange("")}
          >
            <X color="white" />
          </button>
        </div>
      );
    }
    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (!res) return null;
          console.log("Files: ", res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    );
  }
);

export default UploadItem;

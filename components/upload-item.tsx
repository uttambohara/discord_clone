import { UploadDropzone } from "@/lib/src/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import React, { forwardRef } from "react";

type UploadItemProps = {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
};

const UploadItem = forwardRef(
  ({ endpoint, value, onChange }: UploadItemProps, ref) => {
    // Display image
    if (value && value.split(".").pop() !== "pdf") {
      return (
        <div className="relative h-20 w-20 mx-auto">
          <Image
            src={value}
            alt="Server image"
            fill
            priority
            className="rounded-full -z-1"
          />
          <div
            className="h-6 w-6 bg-red-600 rounded-full z-1 flex items-center justify-center absolute top-0 right-0 p-1 cursor-pointer"
            onClick={() => onChange("")}
          >
            <X color="white" />
          </div>
        </div>
      );
    }

    //  Upload dropzone
    return (
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (!res) return null;

          onChange(res?.[0]?.url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    );
  },
);

UploadItem.displayName = "UploadItem";
export default UploadItem;

import { UploadDropzone } from "@/lib/uploadthing";
import { File, X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

interface UploadContentProps {
  endpoint: "imageUploader" | "fileUploader";
  value: string;
  onChange: (value: string) => void;
}

const UploadContent = forwardRef(
  ({ endpoint, value, onChange }: UploadContentProps, ref) => {
    const isPdf = value.split(".").pop() === "pdf";

    // If uploded file is not pdf
    if (value && !isPdf) {
      return (
        <div className="flex items-center justify-center">
          <div className="relative h-16 w-16">
            <Image
              src={value}
              alt="Server image"
              fill
              priority
              className="object-cover rounded-full"
            />
            {/* Cross button */}
            <button
              className="absolute top-0 right-0 bg-red-700 rounded-full flex items-center justify-center p-1"
              onClick={() => onChange("")}
            >
              <X className="text-white" size={14} />
            </button>
          </div>
        </div>
      );
    }

    if (value && isPdf) {
      return (
        <div>
          <div className="relative">
            <a href={value} target="_blank">
              <div className="bg-purple-50 p-2 flex items-center gap-2">
                <File size={40} className="stroke-purple-400 fill-blue-100" />
                {value}
              </div>
            </a>

            {/* Cross button */}
            <button
              className="absolute -top-2 -right-2 bg-red-700 rounded-full flex items-center justify-center p-1"
              onClick={() => onChange("")}
            >
              <X className="text-white" size={14} />
            </button>
          </div>
        </div>
      );
    }

    return (
      <UploadDropzone
        className="dark:bg-[#36393e]"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
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
  }
);

export default UploadContent;

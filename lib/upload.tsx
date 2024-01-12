import { UploadDropzone } from "@/components/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { forwardRef } from "react";

interface UploadProps {
  endpoint: "imageUploader";
  value: string;
  onChange: (value: string) => void;
}

const Upload = forwardRef(({ endpoint, value, onChange }: UploadProps, ref) => {
  console.log({ value });
  if (value) {
    return (
      <div className="flex items-center justify-center">
        <div className="server__avatar relative">
          <Image
            src={value}
            alt="Server"
            priority
            fill
            className="object-cover rounded-full"
          />

          <button
            className="server__avatar-cross h-2 w-2 rounded-full"
            onClick={() => onChange("")}
          >
            <X size={16} color="white" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        if (res) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
});

export default Upload;
Upload.displayName = "Upload";

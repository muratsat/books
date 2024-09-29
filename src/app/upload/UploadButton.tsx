"use client";
import { UploadDropzone } from "@/app/_components/uploadthing";

export function UploadComponent() {
  return (
    <UploadDropzone
      endpoint="epubUploader"
      onClientUploadComplete={(result) => {
        alert(JSON.stringify(result, null, 2));
      }}
      onUploadError={(error: Error) => {
        alert(error.message);
      }}
    />
  );
}

"use client";
import { upload } from "@imagekit/next";
import { useState, useRef } from "react";
import { Check, Copy, Trash2 } from "lucide-react";

export default function UploadFilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadUrl(null);
    } else if (file) {
      alert("Please select only image files.");
      event.target.value = null;
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadUrl(null);
    }
  };

  const handleButtonSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleDiscardImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    try {
      const authResponse = await fetch("/api/upload-auth");
      if (!authResponse.ok)
        throw new Error("Error getting authentication parameters");
      const { token, signature, expire, publicKey } = await authResponse.json();

      const transformationParams = {
        pre: "q-60,f-webp",
      };

      const uploadResponse = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        publicKey,
        token,
        transformation: transformationParams,
        signature,
        expire,
        onProgress: (event) =>
          setProgress(Math.round((event.loaded / event.total) * 100)),
      });

      setUploadUrl(uploadResponse.url);
      setSelectedFile(null);
      setPreviewUrl(null);
      setProgress(0);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCopyToClipboard = async () => {
    if (uploadUrl) {
      try {
        await navigator.clipboard.writeText(uploadUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Imagekit Compress & Upload Prototype
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {previewUrl && (
              <div className="w-32 h-32 rounded-md overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 space-y-2">
              <button
                disabled={progress > 0}
                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  progress > 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onClick={handleButtonSelectFile}
              >
                Select image
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {selectedFile && (
                <button
                  disabled={progress > 0}
                  className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    progress > 0
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                  onClick={handleDiscardImage}
                >
                  <Trash2 size={20} className="mr-2 inline-block" /> Discard
                </button>
              )}
            </div>
          </div>
          <button
            disabled={progress > 0}
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              progress > 0
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
            onClick={handleUploadFile}
          >
            Upload image
          </button>
          {progress > 0 && <p>Upload progress: {progress}%</p>}
          {uploadUrl && (
            <div className="mt-4 flex flex-col space-y-2">
              <p className="text-lg text-gray-700">
                Image uploaded successfully. Here is the link:
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={uploadUrl}
                  readOnly
                  className="flex-1 border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleCopyToClipboard}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {copySuccess ? <Check size={22} /> : <Copy size={22} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

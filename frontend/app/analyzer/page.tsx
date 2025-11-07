"use client";
import { useState, ChangeEvent } from "react";

type AnalyzeResult = {
  error?: string;
  pixel_color?: number[];
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: formData,
    });
    const data: AnalyzeResult = await res.json();
    setResult(data);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Face Pixel Color Analyzer</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Analyze</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <p>Pixel Color (BGR): {result.pixel_color?.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

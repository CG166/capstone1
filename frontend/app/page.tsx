"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const goToAnalyzer = () => {
    router.push("/analyzer"); // Navigate to /analyzer
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Face Color Project</h1>
      <p>Click the button below to go to the Face Analyzer page:</p>
      <button onClick={goToAnalyzer} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Go to Analyzer
      </button>
    </div>
  );
}


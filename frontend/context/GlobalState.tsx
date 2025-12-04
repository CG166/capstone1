"use client";

import { createContext, useState, ReactNode } from "react";

type CAnalyzeResult = {
  error?: string;
  color_analysis_results?: string[];
};


interface GlobalContextType {
  //File
  file: File | null;
  setFile: (file: File | null) => void;

  //ImageURL
  displayUrl: string;
  setDisplayUrl: (value: string) => void;
  
  //Sourcetype
  source: string;
  setSource: (value: string) => void;

  //Analysistype
  analysis: string;
  setAnalysis: (value: string) => void;

  //Color analysis results
  CAresults: CAnalyzeResult | null;
  setCAresults: (value: CAnalyzeResult | null) => void;
 
}

//Set default values
export const GlobalContext = createContext<GlobalContextType>({
  file: null,
  setFile: () => {},

  source: "",
  setSource: () => {},

  displayUrl: "",
  setDisplayUrl: () => {},

  analysis: "",
  setAnalysis: () => {},

  CAresults: null,
  setCAresults: () => {},
});

interface Props {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<string>("");
  const [displayUrl, setDisplayUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [CAresults, setCAresults] = useState<CAnalyzeResult | null>(null);


  return (
    <GlobalContext.Provider value={{ file, setFile, source, setSource, displayUrl, setDisplayUrl, analysis, setAnalysis, CAresults, setCAresults }}>
      {children}
    </GlobalContext.Provider>
  );
};

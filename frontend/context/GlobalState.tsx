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

  //Facial Analysis Results
  faceshape: string;
  setFaceshape: (value: string) => void;

  focalpoints: string[];
  setFocalpoints: (value: string[]) => void;

  proportions: number[];
  setProportions: (value: number[]) => void;

 
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

  faceshape: "",
  setFaceshape: () => {},

  focalpoints: [],
  setFocalpoints: () => {},

  proportions: [],
  setProportions: () => {}

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
  const [faceshape, setFaceshape] = useState<string>("");
  const [focalpoints, setFocalpoints] = useState<string[]>([]);
  const [proportions, setProportions] = useState<number[]>([]);


  return (
    <GlobalContext.Provider value={{ file, setFile, source, setSource, displayUrl, setDisplayUrl, analysis, setAnalysis, CAresults, setCAresults, faceshape, setFaceshape, focalpoints, setFocalpoints, proportions, setProportions }}>
      {children}
    </GlobalContext.Provider>
  );
};

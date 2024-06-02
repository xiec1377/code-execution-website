import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [code, setCode] = useState("");
  const handleTestCode = async () => {
    console.log(`HANDLE TEST CODE...`)
  };

  const handleSubmit = async () => {
    console.log(`HANDLE SUBMIT...`)
  };
  return (
    <div className="">
      <Editor
        height="60vh"
        width="100vw"
        defaultLanguage="python"
        defaultValue="# Write your PythonF code here"
        onChange={(value) => setCode(value || "")}
      />
      <button
        onClick={handleTestCode}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Test Code
      </button>
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default CodeEditor;

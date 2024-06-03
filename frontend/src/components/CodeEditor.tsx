import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CodeEditor() {
  const [code, setCode] = useState("");
  const handleTestCode = async () => {
    console.log(`HANDLE TEST CODE...`);
    try {
      const response = await fetch("http://localhost:8000/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      console.log(`Response:`);
      console.log(result);
      toast.success("Successfully tested code");
    } catch (error) {
      console.error("Error testing code:", error);
      toast.error("Error testing code");
    }
  };

  const handleSubmit = async () => {
    console.log(`HANDLE SUBMIT...`);
    try {
      const response = await fetch("http://localhost:8000/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      console.log(result);
      toast.success("Successfully submitted code");
    } catch (error) {
      console.error("Error submitting code:", error);
      toast.error("Error submitting code");
    }
  };
  return (
    <div className="">
      <Editor
        height="60vh"
        width="100vw"
        defaultLanguage="python"
        defaultValue="# Write your Python code here"
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

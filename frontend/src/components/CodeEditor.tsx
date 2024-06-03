import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
// import { ReactTerminal } from "react-terminal";
import "react-toastify/dist/ReactToastify.css";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const handleTestCode = async () => {
    console.log(`HANDLE TEST CODE...`);
    setResult("Running test code...");
    try {
      const response = await fetch("http://localhost:8000/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      console.log(`Response:`);
      console.log(result);
      setResult(result);
      console.log(`type of result: ${typeof result}`)
      toast.success("Successfully tested code");
    } catch (error) {
      console.error("Error testing code:", error);
      toast.error("Error testing code");
    }
  };

  const handleSubmit = async () => {
    console.log(`HANDLE SUBMIT...`);
    setResult("Submitting code...");
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
      setResult(result);
      toast.success("Successfully submitted code");
    } catch (error) {
      console.error("Error submitting code:", error);
      toast.error("Error submitting code");
    }
  };

  // const parseResult = (result: object) => {
  //   const parse = result["message"]
  // }
  return (
    <div className="">
      <div className="flex">
        <Editor
          height="60vh"
          width="100vw"
          defaultLanguage="python"
          defaultValue="# Write your Python code here"
          onChange={(value) => setCode(value || "")}
        />
        <Editor
          height="60vh"
          width="100vw"
          defaultLanguage="python"
          defaultValue={"Waiting for code..."}
          value={result}
        />
      </div>
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

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
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
      console.log(`type of result: ${typeof result}`);
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

  return (
    <div className="">
      <span className="flex w-full space-x-4">
        <Editor
          height="60vh"
          width="50%"
          defaultLanguage="python"
          defaultValue="# Write your Python code here"
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 16,
            lineNumbers: "on",
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
        <Editor
          height="60vh"
          width="50%"
          defaultLanguage="python"
          defaultValue={"Waiting for code..."}
          value={result}
          options={{
            fontSize: 16,
            lineNumbers: "off",
            readOnly: true,
            wordWrap: "on",
          }}
        />
      </span>
      <span className="flex justify-center space-x-4 mt-4 w-full">
        <button
          onClick={handleTestCode}
          className="mt-4 bg-blue-500 text-white rounded w-100"
        >
          Test Code
        </button>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white rounded w-100"
        >
          Submit
        </button>
      </span>
    </div>
  );
}

export default CodeEditor;

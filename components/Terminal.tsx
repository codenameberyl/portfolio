"use client";

import { useState } from "react";

export default function Terminal() {
  const [output, setOutput] = useState<string[]>([]);

  const handleCommand = (cmd: string) => {
    if (cmd === "help") {
      setOutput((prev) => [...prev, "Commands: help, projects, contact"]);
    } else if (cmd === "projects") {
      setOutput((prev) => [...prev, "Loading projects..."]);
    } else {
      setOutput((prev) => [...prev, "Unknown command"]);
    }
  };

  return (
    <section className="terminal p-4 rounded-xl">
      <p>AI Terminal v1.0</p>

      <input
        className="bg-transparent outline-none mt-2"
        placeholder="Type a command..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommand((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        }}
      />

      <div className="mt-4">
        {output.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}
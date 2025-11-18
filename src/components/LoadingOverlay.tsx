type LoadingOverlayProps = {
  isComplete: boolean;
};

export function LoadingOverlay({ isComplete }: LoadingOverlayProps) {
  const lines = [
    "Installing npm packages nobody asked for...",
    "Compiling TypeScript into hopes and dreams...",
    "Optimizing backend queries for imaginary traffic...",
    "Refactoring APIs until latency gives up...",
    "Welcome to my portfolio · Enjoy the ride 🚀",
  ];

  const baseDelay = 0.4;
  const stepDelay = 1.2;

  const codeColumns = Array.from({ length: 16 });
  const codeSnippet =
    `const sum = (a,b) => a+b;\n` +
    `async function fetchData(url){\n  const r = await fetch(url);\n  return r.json();\n}\n` +
    `interface User { id: number; name: string }\n` +
    `for (let i=0;i<5;i++){ console.log('build', i) }\n`;

  return (
    <div
      className={`loading ${isComplete ? "loading--complete" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={isComplete}
    >
      {/* animated code background */}
      <div className="loading__code" aria-hidden="true">
        {codeColumns.map((_, i) => (
          <span
            key={i}
            className="loading__code-col"
            style={{
              // distribute columns evenly and vary duration/delay
              // CSS variables used in styles
              ["--i" as any]: i,
              ["--dur" as any]: `${14 + (i % 5) * 2}s`,
              ["--delay" as any]: `${(i % 7) * 0.6}s`,
              ["--blur" as any]: i % 3 === 0 ? "0px" : "1px",
              ["--opa" as any]: i % 4 === 0 ? 0.35 : 0.22,
            }}
          >
            {(codeSnippet + codeSnippet).repeat(6)}
          </span>
        ))}
      </div>

      <div className="loading__terminal">
        <div className="loading__header">
          <span />
          <span />
          <span />
        </div>
        <div className="loading__body">
          {lines.map((text, index) => {
            const isFinalLine = index === lines.length - 1;
            const className = [
              "loading__line",
              isFinalLine ? "loading__line--success" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <span
                key={text}
                className={className}
                style={{
                  animationDelay: `${baseDelay + index * stepDelay}s`,
                }}
              >
                <span className="loading__icon" aria-hidden="true">
                  ✓
                </span>
                <span className="loading__text">{text}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="loading__progress" aria-hidden="true">
        <span className="loading__bar" />
      </div>
    </div>
  );
}


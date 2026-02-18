import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DEMO_STORAGE_KEY = "cuatre_demo_html";

const DemoPreview = () => {
  const navigate = useNavigate();
  const htmlContent = sessionStorage.getItem(DEMO_STORAGE_KEY);

  useEffect(() => {
    // Clean up demo on unmount (leaving page)
    return () => {
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
    };
  }, []);

  if (!htmlContent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
        <p className="text-muted-foreground text-sm font-mono tracking-wider">
          No demo available. It may have expired.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono tracking-wider uppercase border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </button>
      </div>
    );
  }

  const fullDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif}html,body{width:100%;height:100%;background:#0c0c0c;color:#f0f0f0}body{overflow-y:auto;overflow-x:hidden}body>div{width:100%;max-width:100%;padding:20px}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,51,51,0.3);border-radius:2px}</style></head><body>${htmlContent}</body></html>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
            <span className="text-primary text-xs font-bold">C4</span>
          </div>
          <span className="text-sm font-display tracking-[0.1em] uppercase text-foreground">
            Demo Preview
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Home
        </button>
      </div>
      <div className="flex-1">
        <iframe
          srcDoc={fullDoc}
          className="w-full h-full border-none"
          style={{ minHeight: "calc(100vh - 65px)", background: "#0c0c0c" }}
          sandbox="allow-scripts"
          title="Demo Preview"
        />
      </div>
    </div>
  );
};

export default DemoPreview;

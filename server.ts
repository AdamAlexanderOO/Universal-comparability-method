import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "operational",
      aiCoreAvailable: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // AI Core Simulation Endpoint
  app.post("/api/simulate", async (req, res) => {
    try {
      const { mode, parameters, context } = req.body;
      const ai = getAiClient();

      if (!ai) {
        // High quality deterministic simulation fallback if no API key
        return res.json({
          status: "simulated_local",
          simulationId: `SIM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          output: {
            title: `Aurora ${mode.toUpperCase()} Matrix Pulse`,
            description: `Generated stable quantum excitation at ${(parameters?.fluxFrequency || 65).toFixed(1)} GHz. Light-Protocol traces stabilized with 99.4% spectral efficiency.`,
            metrics: {
              efficiency: ((parameters?.fluxFrequency || 50) * 0.94 + 48).toFixed(1) + "%",
              quantumCoherence: "0.984 Φ",
              entropyIndex: "0.012 Δe",
              thermalDissipation: "234 W/cm²",
            },
            recommendation: "Increase Nutrient System circulation to dampen harmonics.",
            anomaliesDetected: 0,
            events: [
              "Holographic layer synchronized with brass gear escapement.",
              "Light-Protocol bus routed 4.2 GW to AI Core.",
              "Shield deflector modulated to 450 THz.",
            ],
          },
        });
      }

      const prompt = `You are the Aurora Machine AI Core & Light-Protocol Simulation Engine.
The user is running a simulation in mode: "${mode || "Quantum Synthesis"}".
Current Deck Telemetry & Parameters:
${JSON.stringify(parameters, null, 2)}
Additional System Context:
${JSON.stringify(context || {}, null, 2)}

Provide a concise, ultra-authentic sci-fi simulation response in JSON format with:
- "title": string (crisp cybernetic protocol title)
- "description": string (2 sentences detailing physics/bio-cybernetic results)
- "metrics": object with key metrics (e.g., efficiency, quantumCoherence, entropyIndex, thermalDissipation)
- "recommendation": string (tactical directive for the operator)
- "anomaliesDetected": number
- "events": array of 3 short chronological log entries`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are the AI Core intelligence embedded within a futuristic Aurora biomechanical deck.",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      return res.json({
        status: "simulated_ai",
        simulationId: `SIM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        output: parsed,
      });
    } catch (err: any) {
      console.error("Simulation error:", err);
      res.status(500).json({
        error: "Simulation execution failed",
        details: err?.message || String(err),
      });
    }
  });

  // Diagnostics & Tactical Analysis Endpoint
  app.post("/api/diagnose", async (req, res) => {
    try {
      const { deckState } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.json({
          status: "diagnostic_nominal",
          analysis: "All subsystems within operational tolerances. Light-Protocol flux optimal across health, shield, and nutrient conduits. Gear train lubrication efficiency at 97.8%.",
          subsystemRatings: {
            lightProtocol: "OPTIMAL",
            gearTrain: "SYNCHRONIZED",
            hologramMesh: "COHERENT",
            nutrientCirculation: "STABLE",
            aiCoreSynapses: "BALANCED",
          },
          directives: [
            "Maintain current flux frequency between 60-80 GHz.",
            "Verify secondary heat-treated alloy seals on node 04.",
          ],
        });
      }

      const prompt = `Analyze this live cyber-deck status and generate an authentic diagnostic breakdown:
State:
${JSON.stringify(deckState, null, 2)}

Return JSON with:
- "analysis": string
- "subsystemRatings": object mapping subsystem names to status ratings (e.g., OPTIMAL, STABLE, WARNING)
- "directives": array of strings (tactical operator instructions)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are the onboard diagnostic telemetry analyst of the Aurora Machine.",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      return res.json({
        status: "diagnostic_ai",
        ...parsed,
      });
    } catch (err: any) {
      console.error("Diagnostic error:", err);
      res.status(500).json({
        error: "Diagnostic scan failed",
        details: err?.message || String(err),
      });
    }
  });

  // Light-Protocol Synthesis Endpoint
  app.post("/api/synthesize-light", async (req, res) => {
    try {
      const { lightPreset, wavelengthTHz, powerWatts } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.json({
          status: "synthesized_local",
          protocolName: `${lightPreset || "AURORA"}-HARMONIC-v${Math.floor(Math.random() * 9 + 1)}`,
          spectralBand: `${wavelengthTHz || 540} THz`,
          energyYield: `${((powerWatts || 100) * 1.42).toFixed(1)} MW/s`,
          resonanceColor: "#00f0ff",
          fluxPathways: ["Core -> AI Synapse", "Core -> Nutrient Buffer", "Core -> Shield Grid"],
          summary: "Coherent photon stream stabilized and locked into hardware matrix.",
        });
      }

      const prompt = `Synthesize a new Light-Protocol based on preset "${lightPreset}", frequency "${wavelengthTHz} THz", and power "${powerWatts} Watts".
Return JSON with:
- "protocolName": string
- "spectralBand": string
- "energyYield": string
- "resonanceColor": hex color string (e.g. #00f0ff or #ff007f or #ffaa00)
- "fluxPathways": array of 3-4 string descriptions of circuit routing
- "summary": string (1-2 sentences on quantum properties)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      return res.json({
        status: "synthesized_ai",
        ...parsed,
      });
    } catch (err: any) {
      console.error("Synthesis error:", err);
      res.status(500).json({
        error: "Light-Protocol synthesis failed",
        details: err?.message || String(err),
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aurora Cyber-Deck Server running on http://localhost:${PORT}`);
  });
}

startServer();

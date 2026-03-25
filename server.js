import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* ============================================================
1️⃣ ROTA DE VOZ (JARVIS REAL)
============================================================*/
app.post("/voz", async (req, res) => {
  try {
    const { texto } = req.body;

    const response = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: texto
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na voz" });
  }
});

/* ============================================================
2️⃣ SERVIDOR
============================================================*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🔥 Jarvis rodando...");
});

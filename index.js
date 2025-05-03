const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/download", (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send("Missing URL parameter");
  }

  const command = `yt-dlp -g "${videoUrl}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`yt-dlp error: ${stderr}`);
      return res.status(500).send("Failed to get download link");
    }
    res.json({ download_url: stdout.trim() });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
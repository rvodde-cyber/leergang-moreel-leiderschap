const fs = require("fs");
const path = require("path");

const url = process.env.SUPABASE_URL || "https://zkiavxldremirlvcmoef.supabase.co";
const key = process.env.SUPABASE_KEY || "";
const lakmoesUrl =
  process.env.LAKMOESPROEF_URL || "https://organisatie-morele-lakmoestest.vercel.app/";

const content = `window.ML_CONFIG = {
  SUPABASE_URL: "${url}",
  SUPABASE_KEY: "${key}",
  LAKMOESPROEF_URL: "${lakmoesUrl}",
};
`;

fs.writeFileSync(path.join(__dirname, "..", "js", "config.js"), content);
console.log("js/config.js generated for deploy");

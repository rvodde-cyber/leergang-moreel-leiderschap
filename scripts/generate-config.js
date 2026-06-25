const fs = require("fs");
const path = require("path");

const url = process.env.SUPABASE_URL || "https://zkiavxldremirlvcmoef.supabase.co";
const key = process.env.SUPABASE_KEY || "";

const content = `window.ML_CONFIG = {
  SUPABASE_URL: "${url}",
  SUPABASE_KEY: "${key}",
};
`;

fs.writeFileSync(path.join(__dirname, "..", "js", "config.js"), content);
console.log("js/config.js generated for deploy");

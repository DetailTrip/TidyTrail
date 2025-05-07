// scripts/json-to-csv.js
const fs   = require("fs");
const { parse } = require("json2csv");

const jsonPath = "./server/bookings.json";
const csvPath  = "./scripts/bookings-import.csv";

const raw  = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const rows = raw.map(({ id, ...rest }) => rest);   // drop old id

fs.writeFileSync(csvPath, parse(rows, { flatten: true }));
console.log(`✅  CSV ready → ${csvPath}  (rows: ${rows.length})`);

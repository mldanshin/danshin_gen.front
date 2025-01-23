import fs from "fs";

export default function write(text) {
    fs.appendFile('storage/logs/app.log', text, () => "");
}
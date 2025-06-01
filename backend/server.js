import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

const port = process.env.PORT || process.env.PORT2;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/",(req,res)=>{
    res.send("<h1>test</h1>");
});

// src/server/server.js
import express from 'express';
import XLSX from 'xlsx';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure CORS to accept requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const EXCEL_FILE_PATH = path.join(__dirname, '..', 'contact_form.xlsx');

// Add a test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.post('/api/submit-form', async (req, res) => {
    try {
        // Check if we received the data
        console.log('Received form data:', req.body);

        // Read existing workbook or create new one if doesn't exist
        let workbook;
        try {
            workbook = XLSX.readFile(EXCEL_FILE_PATH);
        } catch (error) {
            // Create new workbook if file doesn't exist
            workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]));
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert sheet to JSON to easily append data
        const data = XLSX.utils.sheet_to_json(sheet);
        
        // Add new submission with timestamp
        const newSubmission = {
            ...req.body,
            timestamp: new Date().toISOString()
        };
        data.push(newSubmission);
        
        // Convert back to sheet
        const newSheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = newSheet;
        
        // Write back to file
        XLSX.writeFile(workbook, EXCEL_FILE_PATH);
        
        res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Failed to update Excel file',
            details: error.message 
        });
    }
});

const PORT = 5174;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Excel file path: ${EXCEL_FILE_PATH}`);
});
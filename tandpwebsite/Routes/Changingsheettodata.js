const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const upload = multer({ dest: './uploads' });


router.post('/changingsheettodata', upload.single('sheetFile'), (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
         
        fs.unlinkSync(filePath);

        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




// Express route for exporting data to Excel
router.post('/changingdatatosheet', async (req, res) => {
    try {
        const data = req.body.data; // Adjusted to match the client-side code
        const name=req.body.name;
        // Ensure the exports directory exists
        const exportsDir = path.join(__dirname, 'exports');
        if (!fs.existsSync(exportsDir)) {
            fs.mkdirSync(exportsDir);
        }

        const sheet = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, sheet, 'Sheet1');

        const filePath = path.join(exportsDir, `${name}.xlsx`);
        xlsx.writeFile(wb, filePath);

        res.json({ success: true, downloadLink: `/exports/exported_data.xlsx` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error exporting data to Excel" });
    }
});
module.exports=router
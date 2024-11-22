const xlsx = require("node-xlsx");

function verbiageBuilder(respExcelFile) {
    const workbook = xlsx.parse(`./${respExcelFile}`);
    let verbiageResponse = [];

    for (const element in workbook) {
        const sheet = workbook[element].data;
        const headers = sheet[0];

        let sheetData = sheet.slice(1).map(row => {
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] ? row[index] : null;
            });
            return obj;
        });

        verbiageResponse.push(...sheetData);
    }
    return verbiageResponse;
}

// function verbiageBuilder() {
//     const workbook = xlsx.parse(`./ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx`);
//     let verbiageResponse = [];

//     for (const element in workbook) {
//         const sheet = workbook[element].data;
//         const headers = sheet[0];

//         let sheetData = sheet.slice(1).map(row => {
//             let obj = {};
//             headers.forEach((header, index) => {
//                 obj[header] = row[index] ? row[index] : null;
//             });
//             return obj;
//         });

//         verbiageResponse.push(...sheetData);
//     }
//     return verbiageResponse;
// }

module.exports = verbiageBuilder;

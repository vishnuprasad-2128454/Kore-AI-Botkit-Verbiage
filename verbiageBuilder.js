const xlsx = require("node-xlsx");

module.exports = {
    verbiageBuilder: function(respExcelFile) {
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

}

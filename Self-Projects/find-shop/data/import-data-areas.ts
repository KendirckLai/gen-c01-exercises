import { Client } from 'pg';
import xlsx from 'xlsx';

interface areas{
    areaName: string;
    region_id:number;
}

async function main() {

    const client = new Client({
        user: "williamchung",
        host: "localhost",
        database: "findshop",
        password: ""
    });

    await client.connect();

    // read xlsx file
    const workbook = xlsx.readFile('./importData/Findshop-database1.xlsx');
    const areas: areas[] = xlsx.utils.sheet_to_json(workbook.Sheets['areas']);

    console.log(areas) 
  

    for (const area of areas) {
        await client.query(
            /*SQL*/`INSERT INTO "areas" ("areaName", "region_id") VALUES
                ($1, $2)`, [area.areaName,area.region_id ]
        );
    }

    await client.end();
}

main();

import { Client } from 'pg';
import xlsx from 'xlsx';

interface regions {
    regionName: string;
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
    const regions: regions[] = xlsx.utils.sheet_to_json(workbook.Sheets['regions']);

    console.log(regions)

    for (const region of regions) {
        await client.query(
            /*SQL*/`INSERT INTO "regions" ("regionName") VALUES
                ($1)`, [region.regionName]
        );
    }

    await client.end();
}

main();

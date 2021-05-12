import { Client } from 'pg';
import xlsx from 'xlsx';

interface shops{
    shopNameChinese: string;
    shopNameEnglish:string;
    area_id: number;
    category_id:number;
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
    const shops: shops[] = xlsx.utils.sheet_to_json(workbook.Sheets['shops']);

    console.log(shops) 
  

    for (const shop of shops) {
        await client.query(
            /*SQL*/`INSERT INTO "shops" ("shopNameChinese", "shopNameEnglish", "area_id", "category_id") VALUES
                ($1, $2, $3, $4)`, [shop.shopNameChinese, shop.shopNameEnglish, shop.area_id, shop.category_id]
        );
    }

    await client.end();
}

main();

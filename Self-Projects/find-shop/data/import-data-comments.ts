import { Client } from 'pg';
import xlsx from 'xlsx';

interface comments{
    content: string
    photo: string
    productVsPrice: number;
    serviceRating: number;
    satisfaction: number;
    user_id: number;
    shop_id: number;
}

async function main() {

    const client = new Client({
        user: "chiwahalexcheung",
        host: "localhost",
        database: "findshop",
        password: "12345"
    });

    await client.connect();

    // read xlsx file
    const workbook = xlsx.readFile('./importData/Findshop-database1.xlsx');
    const comments: comments[] = xlsx.utils.sheet_to_json(workbook.Sheets['comments']);

    console.log(comments) 
  
    for (const comment of comments) {
        await client.query(
            /*SQL*/`INSERT INTO "comments" ("content", "photo", "productVsPrice", "serviceRating", "satisfaction", "user_id", "shop_id") VALUES
                ($1, $2, $3, $4, $5, $6, $7)`, [comment.content, comment.photo, comment.productVsPrice, comment.serviceRating, comment.satisfaction, comment.user_id, comment.shop_id]
        );
    }

    await client.end();
}

main();

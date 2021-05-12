import { Client } from 'pg';
import xlsx from 'xlsx';

interface users{
    name: string;
    password:string;
    role_id: number;
}

async function main() {

    const client = new Client({
        user: "alex",
        host: "localhost",
        database: "findshop",
        password: "12345"
    });

    await client.connect();

    // read xlsx file
    const workbook = xlsx.readFile('./importData/Findshop-database1.xlsx');
    const users: users[] = xlsx.utils.sheet_to_json(workbook.Sheets['users']);

    console.log(users) 
  

    for (const user of users) {
        await client.query(
            /*SQL*/`INSERT INTO "users" ("name", "password", "role_id") VALUES
                ($1, $2, $3)`, [user.name, user.password, user.role_id]
        );
    }

    await client.end();
}

main();

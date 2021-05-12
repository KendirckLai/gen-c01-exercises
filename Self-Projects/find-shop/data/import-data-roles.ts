import { Client } from 'pg';
import xlsx from 'xlsx';


interface roles {
    role: string;
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

    const roles: roles[] = xlsx.utils.sheet_to_json(workbook.Sheets['roles']);

    for (const role of roles) {
        await client.query(
            /*SQL*/`INSERT INTO "roles" (role) VALUES
                ($1)`, [role.role]
        );
    }

    await client.end();
}

main();

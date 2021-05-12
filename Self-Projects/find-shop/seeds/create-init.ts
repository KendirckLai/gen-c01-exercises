import * as Knex from 'knex';
import tables from '../tables';
import path from 'path';
import xlsx from 'xlsx';
// import { hashPassword } from '../hash';

interface SHOPS {
    name: string;
    "shopNameChinese": string;
    "shopNameEnglish": string;
    area_id: number;
    category_id: number;
}

interface COMMENTS {

    content: string;
    photo: string;
    "productVsPrice": number;
    "serviceRating": number;
    satisfaction: number;
    user_id: number;
    shop_id: number;
}

interface USERS {

    name: string;
    password: number;
    role_id: number;
}

interface AREAS {
    id: number;
    "areaName": string;
    region_id: number;
}

interface REGIONS {
    id: number;
    "regionName": string;
}

interface ROLES {
    id: number;
    role: string;
}

interface CATEGORIES {
    id: number;
    "categoryName": string;
}

export async function seed(knex: Knex): Promise<any> {
    await knex(tables.COMMENTS).del();
    await knex(tables.SHOPS).del();
    await knex(tables.USERS).del();
    await knex(tables.ROLES).del();
    await knex(tables.CATEGORIES).del();
    await knex(tables.AREAS).del();
    await knex(tables.REGIONS).del();
    const mapping = {};


    {
        const workbook = xlsx.readFile(
            path.join(__dirname, '../data/Findshop-database1.xlsx')
        );
        const SHOPS: SHOPS[] = xlsx.utils.sheet_to_json(workbook.Sheets['shops']);
        const COMMENTS: COMMENTS[] = xlsx.utils.sheet_to_json(workbook.Sheets['comments']);
        const USERS: USERS[] = xlsx.utils.sheet_to_json(workbook.Sheets['users']);
        const AREAS: AREAS[] = xlsx.utils.sheet_to_json(workbook.Sheets['areas']);
        const REGIONS: REGIONS[] = xlsx.utils.sheet_to_json(workbook.Sheets['regions']);
        const ROLES: ROLES[] = xlsx.utils.sheet_to_json(workbook.Sheets['roles']);
        const CATEGORIES: CATEGORIES[] = xlsx.utils.sheet_to_json(workbook.Sheets['categories']);
        
        for (const categories of CATEGORIES) {
            await knex.raw(
                /*SQL*/ `INSERT INTO ${tables.CATEGORIES} (id,"categoryName") VALUES (?,?);`,
                [categories.id, categories.categoryName,]
            );
        }

        for (const roles of ROLES) {
            await knex.raw(
                /*SQL*/ `INSERT INTO ${tables.ROLES} (id,role) VALUES (?,?);`, [roles.id, roles.role]
            );
        }

        for (const regions of REGIONS) {
            await knex.raw(
                /*SQL*/ `INSERT INTO ${tables.REGIONS} (id,"regionName") VALUES (?,?);`, [regions.id, "regions.regionName"]
            );
        }


        for (const areas of AREAS) {
            await knex.raw(
                /*SQL*/ `INSERT INTO ${tables.AREAS} (id,"areaName",region_id) VALUES (?,?,?);`,
                [areas.id, areas.areaName, areas.region_id]
            );
        }

        for (const users of USERS) {        
            const [user_id]=(await knex.raw(/*SQL*/`INSERT INTO ${tables.USERS} (name,password,role_id) VALUES (?,?,?);`,
                    [users.name, users.password, users.role_id])).rows;
                mapping[users.name]=user_id
            }
            

        for (const shops of SHOPS) {
              await knex.raw(/*SQL*/`INSERT INTO ${tables.SHOPS} ("shopNameChinese","shopNameEnglish",area_id,category_id)VALUES (?,?,?,?);`,
                    [shops.shopNameChinese, shops.shopNameEnglish||"", shops.area_id, shops.category_id]);
            }
        
            for (const comments of COMMENTS) {
                await knex.raw(/*SQL*/`INSERT INTO ${tables.COMMENTS} (content, photo, "productVsPrice", "serviceRating", satisfaction,user_id, shop_id)VALUES (?,?,?,?,?,?,?);`,
                    [comments.content, comments.photo, comments.productVsPrice||"", comments.serviceRating||"", comments.satisfaction, comments.user_id, comments.shop_id]);
            }

    }
}

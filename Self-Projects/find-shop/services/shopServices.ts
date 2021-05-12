import Knex from 'knex';
import tables from '../tables';

export class shopService {
    constructor(private knex: Knex) { }

    async createShops(
        shopNameChinese: string,
        shopNameEnglish: string,
        area_id: number,
        category_id: number,
    ) {
        const result = (await this.knex.raw(/*sql*/`INSERT INTO SHOPS
            (shopNameChinese, shopNameEnglish, area_id, category_id, ) VALUES (?,?,?,?)`,
            [shopNameChinese, shopNameEnglish, area_id, category_id])
        ).rows;
        const testing = result.rows
        console.log(result)
        return await testing
    }


    //     (tables.SHOPS)
    //         .insert({
    //             shopNameChinese,
    //             shopNameEnglish,
    //             area_id,
    //             category_id
    //         })
    //         .returning('id');
    //     return id;
    // }// what does the insert mean? inserting this to sql as format?

    getShop = async () =>
        await this.knex(tables.SHOPS).select("shopNameChinese", "shopNameEnglish", "area_id", "category_id");
}

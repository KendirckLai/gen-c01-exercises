import Knex from 'knex';
import tables from '../tables';

interface IUser {
	id: number;
    username: string;
    password: string;
}

export class UserService {
    constructor(private knex: Knex) {}

    // async getUserByName(username: string) {
    //     const query = this.knex.select("*").from(tables.USERS).where("username", username).first();
    // 	console.log(query.toSQL());
    //     return (await query) as IUser;
    // }

    ///Psql version by william//
    async getUserByName(username: string) {
        const query = (
            await this.knex.raw
                (/*SQL*/ `SELECT * 
            FROM ${tables.USERS} WHERE 
            name = ?`, [username]
                )
        ).rows;
        console.log(query);
        return query[0] as IUser;
       
    }
}

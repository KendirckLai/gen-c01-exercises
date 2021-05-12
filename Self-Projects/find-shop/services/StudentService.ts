import Knex from 'knex';
import tables from '../tables';

export class StudentService {
    constructor(private knex: Knex) {}

    async getAllStudents() {
        const query = this.knex
            .select('id', 'name', 'level')
            .from(tables.STUDENTS);
        return (await query) as {
            id: number;
            name: string;
            level: number;
        }[];
    }

    async searchStudentsByName(keyword: string) {
        const query = this.knex
            .select('id', 'name', 'level')
            .from(tables.STUDENTS)
            .where('name', 'like', `%${keyword}%`);
        // console.log(query.toSQL());
        return (await query) as {
            id: number;
            name: string;
            level: number;
        }[];
    }
}

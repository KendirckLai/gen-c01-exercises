import { StudentService } from '../services/StudentService';
import express from 'express';

export class StudentRouter {
    constructor(private studentService: StudentService) {}

    router() {
        const router = express.Router();
        router.get('/', this.search);
        return router;
    }

    search = async (req: express.Request, res: express.Response) => {
        try {
            const keyword = req.query.keyword as string;
            let students;
            if (!keyword) {
                students = await this.studentService.getAllStudents();
            } else {
				students = await this.studentService.searchStudentsByName(keyword);
			}
            res.json({ students });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'internal server error' });
        }
    };
}

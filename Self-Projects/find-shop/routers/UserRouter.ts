import { UserService } from '../services/UserService';
import express from 'express';
import { checkPassword } from '../hash';

export class UserRouter {
    constructor(private userService: UserService) {}

    router() {
        const router = express.Router();
        router.post('/login', this.login);
        return router;
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const user = await this.userService.getUserByName(
                req.body.username
            );
            if (!user) {
                return res.status(401).json({ message: 'invalid username' });
            }
            const match = await checkPassword(req.body.password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'invalid password' });
            }
            if (req.session) {
                req.session.user = {
                    id: user.id,
                };
            }
            return res.status(200).end();
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'internal server error' });
        }
    };
}

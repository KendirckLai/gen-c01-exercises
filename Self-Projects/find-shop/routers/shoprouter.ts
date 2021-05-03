import express, { Request, Response } from 'express';
import { shopService } from '../services/shopServices';

export class shopRouter {
    constructor(private shopService: shopService) { }

    router() {
        const router = express.Router();
        router.post('/', this.create);
        router.get('/shops', this.getshops);
        return router;
    }

    create = async (req: Request, res: Response) => {
        try {
            const { shopNameChinese
                , shopNameEnglish
                , area_id,
                category_id } = req.body;
            const shopID = await this.shopService.createShops(
                shopNameChinese,
                shopNameEnglish,
                area_id,
                category_id
            );
            console.log("hello world");
            res.json({ shop_id: shopID });
        
            }catch (e) {
                console.log("error")
                res.status(500).json({ message: 'internal server error' });


            }
        };

        getshops = async (req: Request, res: Response) => {
            // try
            const shopsinfo = await this.shopService.getShop();
            res.json({ shopsinfo });
            // catch
        };
    }

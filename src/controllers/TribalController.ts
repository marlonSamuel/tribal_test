import { GET, route } from "awilix-express";
import { BaseController } from "../common/BaseConotroller";
import { TribalService } from "../services/TribalService";
import { Request, Response } from 'express'


@route('/api')
export class TribalController extends BaseController{
    constructor (private readonly tribalService: TribalService){
        super();
    }

    @route('/jockes')
    @GET()
    public async getJockesRando(req: Request, res: Response){
        try {
            let data = await this.tribalService.countDataJockes();
            res.status(200).send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }
}
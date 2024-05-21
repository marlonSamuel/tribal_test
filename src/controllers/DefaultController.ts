import {DELETE, GET, POST, PUT, route} from 'awilix-express'
import { Request, Response } from 'express'
import { TestService } from '../services/TestService'
import { ITestDto } from '../services/dtos/TestDto';
import { BaseController } from '../common/BaseConotroller';

@route('/check')
export class DefaultController extends BaseController {
    constructor(private readonly testService: TestService){
        super();
    }

    @GET()
    public index(req: Request, res: Response):void{
        res.send({
            message: 'Corriendo'
        })
    }

    @route('/getAll')
    @GET()
    public async test(req: Request, res: Response) {
        try {
            let data = await this.testService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async create(req: Request, res: Response) {
        try {
            let body: ITestDto = req.body;
            await this.testService.create(body);
            res.status(200).send();
        } catch (error) {
            this.handleException(error, res)
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            let data: ITestDto = req.body;
            await this.testService.update(id,data);
            return res.status(200).send();
        } catch (error) {   
            this.handleException(error,res)
        }
    }

    @route('/:id')
    @DELETE()
    public async destroy(req: Request, res: Response){
        try {
            let id = parseInt(req.params.id);
            await this.testService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}
import {DELETE, GET, POST, PUT, before, route} from 'awilix-express'
import { Request, Response } from 'express'
import { TestService } from '../services/TestService'
import { ITestDto } from '../services/dtos/TestDto';
import { BaseController } from '../common/BaseConotroller';
import { UserService } from '../services/UserService';
import { IUserDto } from '../services/dtos/IUserDto';
import { check } from 'express-validator';
import { validateFields } from '../common/validate_fields';

@route('/users')
export class DefaultController extends BaseController {
    constructor(private readonly userService: UserService){
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
            let data = await this.userService.getAll();
            res.send(data);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/login')
    @POST()
    public async login(req: Request, res: Response) {
        try {
            let data : IUserDto = req.body;
            let _login = await this.userService.login(data.email, data.password)
            res.send(_login);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    @before([
        check('email').notEmpty(),
        check('password').notEmpty(),
        validateFields
    ])
    public async create(req: Request, res: Response) {
        try {
            let body: IUserDto = req.body;
            await this.userService.create(body);
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
            let data: IUserDto = req.body;
            await this.userService.update(id,data);
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
            await this.userService.delete(id);
            return res.status(200).send();
        } catch (error) {
            this.handleException(error,res)
        }
    }
}
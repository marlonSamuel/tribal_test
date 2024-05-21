import SHA from "sha.js";
import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { IUserDto } from "./dtos/IUserDto";
import { ITestDto } from "./dtos/TestDto";
import { UserEntitie } from "./entities/UserEntitie";
import jwt from 'jsonwebtoken';

export class UserService extends BaseController {

    async getAll(){
        try {
            let data = await UserEntitie.findAll();
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    async login(email: string, pass: string){
        pass = SHA('sha256').update(pass as any).digest('base64');
        let user: any = await UserEntitie.findOne({where: {email: email, password: pass}})
        if(!user){
            throw new ApplicationException("Credenciales invalidas")
        }
        let secret_key:string = process.env.jwt_secret || '';
        
        return jwt.sign({
            id: user.id,
            email: user.email
        }, secret_key, { expiresIn: '15h', algorithm: 'HS256' });
    }

    async create(data : IUserDto){
        try {
            data.password = SHA('sha256').update(data.password as any).digest('base64');
            await UserEntitie.create(data as any);
            return true;
        } catch (error) {
            console.log(error)
        }
    }

    async update(id: number, data : IUserDto){
        try {
            console.log(data)
            let row : any = await UserEntitie.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            row.name = data.email;
            await row.save();
            return {
                valid: true
            };
        } catch (error:any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }

    async delete(id: number){
        try {
            let row : any = await UserEntitie.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            await row.destroy();
            return {
                valid: true
            }
        } catch (error : any) {
            console.log(error)
            throw new ApplicationException(error.message)
        }
    }


}
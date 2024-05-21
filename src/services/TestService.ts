import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";
import { ITestDto } from "./dtos/TestDto";
import { TestEntitie } from "./entities/TestEntitie";

export class TestService extends BaseController {

    get(): Date {
        return new Date();
    }

    async getAll(){
        try {
            let data = await TestEntitie.findAll();
            return data;
        } catch (error) {
            console.log(error)
        }
        
    }

    async create(data : ITestDto){
        try {
            await TestEntitie.create(data as any);
            return true;
        } catch (error) {
            console.log(error)
        }
    }

    async update(id: number, data : ITestDto){
        try {
            console.log(data)
            let row : any = await TestEntitie.findByPk(id);
            if(!row){
                throw new ApplicationException("Registro no encontrado")
            }
            row.name = data.name;
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
            let row : any = await TestEntitie.findByPk(id);
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
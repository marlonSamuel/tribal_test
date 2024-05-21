import { BaseController } from "../common/BaseConotroller";
import { ApplicationException } from "../common/application.exception";

export class TribalService extends BaseController {

    //request a servicio
    async getJokesRandom() {
        var config = {
            method: 'get',
            url: 'https://api.chucknorris.io/jokes/random',
            headers: { }
        };

         let resp:any=  await fetch('https://api.chucknorris.io/jokes/random', {cache: "no-store"});
         return resp.json();
    }

    //función para contar los datos
    async countDataJockes(){
        let data:any = [];
        let cont = 25;

        //todo se realiza de forma asincrona
        const workLoad = Array.from({length: cont}, (x, i) => i)
         .map(async i => 
         {
            let resp:any = await this.getJokesRandom();
            let exits = data.some((x:any)=>x.id === resp.id)
            //si no existe vuelve hacer la petición
            while(exits){
                resp = await this.getJokesRandom();
                exits = data.some((x:any)=>x.id === resp.id)
            }
            data.push({
                id: resp.id,
                udl: resp.url,
                value: resp.value
            })
         });
        await Promise.all(workLoad); //se realizan todas las peticiones a la vez con promiseAll, mejora significativamente el rendimiento

        console.log('data',data.length)
        return data; 
    }
}

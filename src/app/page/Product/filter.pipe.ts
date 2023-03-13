import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'FilterCode'
})
export class PipeFilter implements PipeTransform{
    transform(value: any[],filter :string) {
        if(value.length===0 || filter===''){
           // console.log(value);
            return value;
            
        }else{
            return value.filter((values)=>{
              //  console.log(values.Name.toLocaleLowerCase()===filter.toLocaleLowerCase());
               return values.Name.toLowerCase()===filter.toLowerCase() ||
                values.Code.toLowerCase()===filter.toLowerCase() ||
                values.Description.toLowerCase()===filter.toLowerCase();
               
            });
        }
    }

}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: any): any {
    if (searchText) {
      let searchToLower=searchText.toLowerCase()
       return array.filter((x:any) => x.companyName.toLowerCase().includes(searchToLower) || x.email.toLowerCase().includes(searchToLower));  
     } else {
       return array;
     }
    }

}

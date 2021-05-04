import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: any): any {
    if (searchText) {
      let searchToLower=searchText.toLowerCase()
       return array.filter((x:any) => x.eventName.toLowerCase().includes(searchToLower) || x.eventDescription.toLowerCase().includes(searchToLower) || x.eventType.toLowerCase().includes(searchToLower));  
     } else {
       return array;
     }
    }

}

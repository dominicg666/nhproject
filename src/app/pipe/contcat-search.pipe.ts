import { Pipe, PipeTransform } from '@angular/core';
import { ContactsModel } from '../services/modal/contacts.model';
@Pipe({
  name: 'contcatSearch'
})
export class ContcatSearchPipe implements PipeTransform {

  transform(value: (ContactsModel)[], args?: any): any {
    if (args == null || args === '') {
      return value;
    }
    let searchText = args.trim().toLowerCase();
    return value.filter(item => {
      return item._objectInstance.name.formatted.trim().toLowerCase().includes(searchText);
    });
  }

}

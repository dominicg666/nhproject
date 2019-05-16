import { CustomField } from './custom-field.base';

export class mtSelect extends CustomField<string> {
    controlType = 'ion-select';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
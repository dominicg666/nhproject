import { CustomField } from './custom-field.base';

export class mtToggle extends CustomField<string> {
    controlType = 'ion-toggle';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
import { CustomField } from './custom-field.base';

export class mtAction extends CustomField<string> {
    controlType = 'ion-action';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
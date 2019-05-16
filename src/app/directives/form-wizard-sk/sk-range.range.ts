import { CustomField } from '../form-wizard-mt/custom-field.base';

export class skRange extends CustomField<string> {
    controlType = 'ion-range';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
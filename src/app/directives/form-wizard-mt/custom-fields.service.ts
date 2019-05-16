import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomField } from './custom-field.base';

@Injectable()
export class CustomControlService {
    constructor() { }

    toFormGroup(customfields: CustomField<any>[]) {
        let group: any = {};

        customfields.forEach(custom => {
            group[custom.key] = custom.required ? new FormControl(custom.value, Validators.required)
                : new FormControl(custom.value);
        });
        return new FormGroup(group);
    }
}
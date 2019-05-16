export class CustomField<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string
    identifier:string;
    minimum:number;
    maximum:number;
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
        type?: string,
        identifier?: string,
        minimum?: number,
        maximum?: number
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.identifier = options.identifier || '';
        this.minimum = options.minimum === undefined ? 1 : options.minimum;
        this.maximum = options.maximum === undefined ? 10 : options.maximum;
    }
}
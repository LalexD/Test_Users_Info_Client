type TSchemaRules = {
    min?: number;
    max?: number;
    email?: boolean;
    isConfirm?: string;
    isRequired?: boolean;
}

type TSchemaItem = {
    dataName: string;
    rules: TSchemaRules;
    message: string;
}

export type TSchema = TSchemaItem[];

export type TValidateFormError = {
    [k: string]: string;
}

export class ValidateFormHelper {
    schema: TSchema;

    constructor(schema: TSchema = []) {
        this.schema = schema;
    }

    validate(data: Record<string, string>): TValidateFormError {
        const errors: TValidateFormError = {};
        Object.keys(data).forEach((dataKey) => {
            const dataValue = data[dataKey];

            const dataSchemes = this.schema.filter(schema => schema.dataName === dataKey);
            if (dataSchemes.length === 0) {
                console.warn(`ValidateFormHelper: schema not found for ${dataKey} `);
            }
            dataSchemes.forEach((schema) => {
                if (!this.isRulesTrue(dataValue, schema.rules, data)) {
                    errors[dataKey] = schema.message;
                }
            })
        })
        return errors
    }

    private isRulesTrue(dataValue: string, rules: TSchemaRules, allData: Record<string, FormDataEntryValue>): boolean {

        return Object.entries(rules).every(([key, value]) => {
            switch (typeof value) {
                case 'number': {
                    switch (key) {
                        case 'min': return this.min(dataValue, value);
                        case 'max': return this.max(dataValue, value);
                    }
                    break
                }
                case 'boolean': {
                    switch (key) {
                        case 'email': return this.email(dataValue, value);
                        case 'isRequired': return this.isRequired(dataValue, value);
                    }
                    break
                }
                case 'string': {
                    switch (key) {
                        case 'isConfirm': {
                            const confirmData = allData[value];
                            if (confirmData === undefined || confirmData instanceof File) return false
                            return this.isConfirm(dataValue, confirmData);
                        }
                    }
                    break
                }
            }
        })
    }
    private isSchemaKey(value: string): value is keyof TSchemaRules {
        return Object.keys(this.schema).includes(value);
    }


    private min(value: string, rule: number): boolean {
        return (value.length >= rule)
    }

    private max(value: string, rule: number): boolean {
        return (value.length <= rule)
    }

    private email(value: string, rule: boolean): boolean {
        const validRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return validRegex.test(value)
    }

    private isConfirm(first: string, second: string): boolean {
        return (first === second)
    }

    private isRequired(value: string, rule: boolean): boolean {
        return (value !== '')
    }
}


import {SyntheticEvent} from "react";

export interface IValidationErrors {
    [key: string]: string
}

export type ValidationFn = (fields: {[key: string]: string}, errors : IValidationErrors) => IValidationErrors
export type OnSubmit = (fields: {[key: string]: string}) => void

export interface IValidationContext {
    validateByField?: {
        [key: string]: ValidationFn
    }
    validate (field: string): void,
    focus (field: string): void,
    validateAll(context: IValidationContext , event: SyntheticEvent): void,
    isErrors(errors: IValidationErrors): boolean,
    onSubmit: OnSubmit,
    fields: {
        [key: string]: string
    },
    touched: {
        [key: string]: boolean
    }
    errors: IValidationErrors
}

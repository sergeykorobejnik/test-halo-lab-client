import React from "react";
import {IValidationContext} from "../types/types";

export const ValidationContext = React.createContext<IValidationContext>({
    fields: {},
    errors: {},
    touched: {},
    validate() {},
    focus(field: string) {
    },
    validateAll() {},
    onSubmit() {},
    isErrors(): boolean {return  true}
})

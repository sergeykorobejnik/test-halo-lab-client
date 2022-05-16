import React, {ReactChildren, useContext, useState} from 'react';
import {ValidationContext} from "../../reactContext/reactContext";
import {IValidationContext, IValidationErrors, OnSubmit, ValidationFn} from "../../types/types";
import {useFirstRenderEffect} from "../../hooks/useFirstRenderEffect";
import styled from "styled-components";
import {ifError} from "assert";

interface IProps {
    fields: {
        [key: string]: string
    },
    validateByField: {
        [key: string]: ValidationFn
    },
    onSubmit: OnSubmit
    children: JSX.Element[] | JSX.Element
}
const ValidatorForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Validator = ({children, fields, validateByField, onSubmit}: IProps) => {
    const validationContext: IValidationContext = {
        fields: {
            ...fields
        },
        errors: {},
        touched: {},
        validateByField,
        validate (field) {
            if(this.validateByField?.[field]) {
                const errors = this.validateByField?.[field](this.fields, this.errors)
                setContext(prevState => {
                    prevState.touched[field] = true

                    prevState.errors = errors

                    return {...prevState}
                })
            }
        },
        focus (field) {
            if (this.touched?.[field]) {
                setContext(prevState => {
                    prevState.errors[field] = ''

                    prevState.touched[field] = false

                    return {...prevState}
                })
            }
        },
        validateAll (context ,event) {
            event.preventDefault()
            for (const field in context.validateByField) {
                setContext(prevState => {
                    const errors = context.validateByField?.[field](context.fields, context.errors)

                    prevState.touched[field] = true

                    if(!errors) return {...prevState}

                    prevState.errors[field] = errors[field]

                    return {...prevState}
                })
            }
            if(!this.isErrors(context.errors)) {
                this.onSubmit(context.fields)
            }
        },
        onSubmit,
        isErrors(errors): boolean {
            for (const error in errors) {
                if (errors[error].length !== 0) {
                    return true
                }
            }

            return false
        }
    }

    useFirstRenderEffect(() => {
        for (const field in fields) {
            validationContext.errors[field] = ''
            validationContext.touched[field] = false
        }
    })

    const [context, setContext] = useState<IValidationContext>(validationContext)

    return (
        <ValidatorForm onSubmit={validationContext.validateAll.bind(validationContext, context)}>
            <ValidationContext.Provider value={context}>
                {children}
            </ValidationContext.Provider>
        </ValidatorForm>
    );
};

export default Validator;
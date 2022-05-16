import {useEffect, useRef, useState} from "react";

const useFirstRenderEffect = (callback: ()=> Promise<void> | void): void => {
    const ref = useRef(true)
    useEffect(() => {
        if(ref.current) {
            callback()
            ref.current = false
        }
    }, [])
}

export {useFirstRenderEffect}
import {containerInstance} from "../container";

//*  This Decorator (Inject) is used to inject dependencies into class properties.
export function Inject(token: string) {
    return function (target: any, key: string) {
        //? Define a getter for the decorated property
        Object.defineProperty(target, key, {
            get: () => containerInstance.resolve(token), // Resolve the dependency from the container
            enumerable: true, // Ensure the property shows up during enumeration
            configurable: true // Allow redefinition of the property
        })
    }
}
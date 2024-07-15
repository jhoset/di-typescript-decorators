/**
 ** Specifying our injectable class decorator
 ** To register our classes for dependency injection, we can use TypeScript decorators.
 *? This allows us to add classes to our container in a clean and organized way.
 */
import {containerInstance} from "../container";

export function Injectable(token: string): Function {
    //? The type { new (): any } is used to describe a class constructor,
    // indicating that target is a function that can be called with new to create an instance of the class.
    return function (target: { new(): any }): void {
        containerInstance.register(token, new target());
    }
}
/**
 * Centralized container for dependency injection services. This container will store all the instances of
 * initialized classes in our application while also provide methods for requesting them.
 */
import {find} from "lodash";

export interface IContainerProvider {
    useValue: any;
    token: string;
}

export class Container {
    /**
     ** Initialize an empty object to hold providers. This object will store instances of injectable classes,
     ** indexed by a key (token) that the consumer of the service uses to provide for that instance.
     */
    private _providers: { [key: string]: any } = {};

    constructor() {
        console.log('Initializing Container...');
    }

    /**
     ** Resolve method -> takes a string (token) provided by the consumer and uses find method (of lodash) to
     ** iterate through the providers object in order to find the matching instance.
     */
    public resolve(token: string) {
        const matchedProvider = find(
            this._providers,
            (_provider, key) => key === token
        );
        //? If an instance is found, return it. If not, throw an error
        if (matchedProvider) {
            console.log('Resolving Provider...', {token, matchedProvider});
            return matchedProvider;
        } else {
            throw new Error(`No provider found for ${token}`);
        }
    }

    //* Register method -> stores the instance in the providers object with the token as the key.
    public register(token: string, instance: any) {
        console.log('Registering Provider...', { token, instance });
        this._providers[token] = instance;
    }

    //? Provide method -> stores the provided value in the container using the specified token.
    //? This make this class UNIT TESTABLE :)
    public provide(details: IContainerProvider): void {
        this._providers[details.token] = details.useValue;
    }
}

/**
 ** Export an instance of the Container, not the Class, because we want this to be a single instance that is
 ** shared across our whole application.
 *? This is known as a Singleton.
 */
export const containerInstance = new Container();

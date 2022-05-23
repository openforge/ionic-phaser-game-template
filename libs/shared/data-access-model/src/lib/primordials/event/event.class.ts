/**
 * * Random events (once generated) can affect any type of Object.
 */

export class Event {
    // TODO - Need to determine how to type this
    statType; // * The type of stat that this event effects
    title: string = 'Random Event'; // * Title of the random event
    value: number = 1; // * The numeric value of the change.  Defaults to 1

    constructor() {
        console.log('Event', 'constructor');
    }
}

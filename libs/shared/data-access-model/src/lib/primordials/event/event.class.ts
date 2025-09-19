/**
 * * Random events (once generated) can affect any type of Object.
 */

export class Event {
    // TODO - Need to determine how to type this
    public statType; // * The type of stat that this event effects
    public title = 'Random Event'; // * Title of the random event
    public value = 1; // * The numeric value of the change.  Defaults to 1

    public constructor() {
        console.log('Event', 'constructor');
    }
}

# Stats

-   An object should be able to receive a Raw Bonus from any "Event"
-   Stats that are used together should _not_ effect each other. Instead they should use each other's values in the calculation function.
-   Since the entire object is serialized, this assures that permanent bonuses are saved in the object but STATS that are used together are never modified by each other.

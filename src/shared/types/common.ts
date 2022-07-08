export type Merge<P, C> = Omit<P, Extract<keyof P, keyof C>> & C;

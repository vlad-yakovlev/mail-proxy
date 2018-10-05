export default class Config<T extends { [key: string]: any }> {
    constructor(private data: T) {}

    public get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }
}

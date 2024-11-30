import ITask from "../interfaces/ITask";
import ITaskOptions from "../interfaces/ITaskOptions";
import CustomClient from "./CustomClient";

export default class Task implements ITask {
    client: CustomClient
    name: string;
    description: string;
    once: boolean;
    timeout: number;
    running: boolean;
    intervalId: number|null;

    constructor(client: CustomClient, options: ITaskOptions) {
        this.client = client
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
        this.timeout = options.timeout;
        this.running = false;
        this.intervalId = null;
    }

    static calculateTimeout(secs: number): number;
    static calculateTimeout(mins: number): number;
    static calculateTimeout(secs: number, mins: number): number;
    static calculateTimeout(secs?: number, mins?: number): number {
        if (secs && mins) return (secs * 1000) + (mins * 60000);
        if (secs) return secs * 1000;
        if (mins) return mins * 60000;
        return 0;
    }

    async Execute(): Promise<void> {
        console.error(`${this.name} task has not been implemented yet.`);
    }
}
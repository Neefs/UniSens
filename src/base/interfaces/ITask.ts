export default interface ITask {
    name: string;
    description: string;
    once: boolean;
    timeout: number;
    running: boolean;
    intervalId: number | null;

    Execute(): Promise<void>;
}
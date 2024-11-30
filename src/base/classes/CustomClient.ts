import { Client, Collection, GatewayIntentBits } from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import Task from "./Task";

export default class CustomClient extends Client implements ICustomClient {
    config: IConfig;
    handler: Handler,
    tasks: Collection<string, Task>;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

    constructor() {
        super({ intents: [GatewayIntentBits.Guilds]});
        this.config = require(`${process.cwd()}/data/config.json`)
        this.handler = new Handler(this);
        this.tasks = new Collection();
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
        this.developmentMode = (process.argv.slice(2).includes("--dev"))
    }
    
    Init(): void {
        console.log(`Starting ${this.developmentMode ? "development" : "production"} mode.`);
        this.LoadHandlers();
        this.login(this.developmentMode ? this.config.devToken : this.config.token)
        .catch((err) => console.error(err));

        }


        
    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}
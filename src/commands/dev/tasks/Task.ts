import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Command from "../../../base/classes/Command";
import CustomClient from "../../../base/classes/CustomClient";
import Category from "../../../base/enums/Category";

export default class Task extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "task",
            description: "Handle the bots running tasks",
            category: Category.Developer,
            dev: true,
            default_member_permissions: PermissionFlagsBits.Administrator,
            dm_permission: true,
            cooldown: 1,
            options: [
                {
                    name: "status", 
                    description: "Get a general status on the bot's tasks",
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: "stop", 
                    description: "Stop a specific task",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "task",
                            description: "The task to stop",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: client.tasks.map(task => {return { name: task.name, value: task.name }})
                        }
                    ]
                },
                {
                    name: "start", 
                    description: "Start a specific task",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "task",
                            description: "The task to start",
                            type: ApplicationCommandOptionType.String,
                            required: true,
                            choices: client.tasks.map(task => {return { name: task.name, value: task.name }})
                        }
                    ]
                }
            ]
        })
    }
}
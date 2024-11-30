import { ChatInputCommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import CustomClient from "../../../base/classes/CustomClient";
import SubCommand from "../../../base/classes/SubCommand";

export default class TaskStart extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: "task.start"
        })
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
        const task = this.client.tasks.find(task => task.name === interaction.options.getString("task"));
        if (!task) {
            interaction.reply({ content: "Task not found.", ephemeral: true });
            return;
        }
        if (task.running) {
            interaction.reply({ content: "Task is already running.", ephemeral: true });
            return;
        }
        task.intervalId = setInterval(() => task.Execute(), task.timeout) as unknown as number;
        task.running = true;
        interaction.reply({ content: `Started \`${task.name}\`.`, ephemeral: true });
    }
}
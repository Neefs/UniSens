import { ChatInputCommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import CustomClient from "../../../base/classes/CustomClient";
import SubCommand from "../../../base/classes/SubCommand";

export default class TaskStop extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: "task.stop"
        })
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
        const task = this.client.tasks.find(task => task.name === interaction.options.getString("task"));
        if (!task) {
            interaction.reply({ content: "Task not found.", ephemeral: true });
            return;
        }
        if (!task.running) {
            interaction.reply({ content: "Task is not running.", ephemeral: true });
            return;
        }
        clearInterval(task.intervalId!);
        task.running = false;
        interaction.reply({ content: `Stopped \`${task.name}\`.`, ephemeral: true });
    }
}
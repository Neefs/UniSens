import { ChatInputCommandInteraction, CacheType, EmbedBuilder } from "discord.js";
import CustomClient from "../../../base/classes/CustomClient";
import SubCommand from "../../../base/classes/SubCommand";

export default class TaskStatus extends SubCommand {
    constructor(client: CustomClient){
        super(client, {
            name: "task.status",
        })
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
        const tasks = this.client.tasks.map(task => task);
        const running = tasks.filter(task => task.running).length;
        const embed = new EmbedBuilder().setColor("#aa41e7").setTitle("Task Status");
        if (tasks.length < 25){
            const fields = tasks.map(task => {
                return {
                    name: task.name,
                    value: `**Running**: \`${task.running}\`\n**Cooldown**: \`${task.timeout / 1000}s\`\n**Description**: \`${task.description}\``,
                }
            })
            embed.addFields(fields);
        } else {
            embed.setDescription(`Too many tasks to display separately.\nActive: ${running}\nTotal: ${tasks.length}`);
        }
        interaction.reply({ embeds: [embed], ephemeral: true });

    }
}
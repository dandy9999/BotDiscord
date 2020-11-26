require('dotenv').config()

const { Client, MessageEmbed } = require('discord.js');
const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
});

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)){
        const [command, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);
        if (command === 'avatar'){
            let user;
            if (message.mentions.users.first()) {
            user = message.mentions.users.first();
            } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
            } else {
            user = message.author;
            }
            
            let avatar = user.displayAvatarURL({size: 2048, dynamic: true});
            
            const embed = new MessageEmbed()
            .setTitle(`${user.tag} avatar`)
            .setDescription(`[Avatar URL of **${user.tag}**](${avatar})`)
            .setColor('RANDOM')
            .setImage(avatar)
            
            return message.channel.send(embed);
        }
    }
});

client.login(token);
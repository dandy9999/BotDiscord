require('dotenv').config()

const { Client, MessageEmbed } = require('discord.js');
const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;
const client = new Client();

//random int function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//day formater
function indoDay(day){
    switch(day) {
        case 0: day = "Minggu"; break;
        case 1: day = "Senin"; break;
        case 2: day = "Selasa"; break;
        case 3: day = "Rabu"; break;
        case 4: day = "Kamis"; break;
        case 5: day = "Jum'at"; break;
        case 6: day = "Sabtu"; break;
    }
    return day;
}

function indoMonth(month){
    switch(month) {
        case 0: month = "Januari"; break;
        case 1: month = "Februari"; break;
        case 2: month = "Maret"; break;
        case 3: month = "April"; break;
        case 4: month = "Mei"; break;
        case 5: month = "Juni"; break;
        case 6: month = "Juli"; break;
        case 7: month = "Agustus"; break;
        case 8: month = "September"; break;
        case 9: month = "Oktober"; break;
        case 10: month = "November"; break;
        case 11: month = "Desember"; break;
    }
    return month;
}

//set bot activity
client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity(`${prefix}help | DandotDev`);
});


//listening messages
client.on('message', (message) => {

    //check messages sender is bot?
    if (message.author.bot) return;
    //check prefix then commands
    if (message.content.startsWith(prefix)){
        const [command, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);

        //avatar command
        if (command === 'avatar' || command === 'av'){
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

        //ping command
        if (command === 'ping' || command === 'p'){
            return message.channel.send("Pinging...").then(m =>{
                var ping = m.createdTimestamp - message.createdTimestamp;
                var embed = new MessageEmbed()
                .setAuthor(`Your ping is ${ping}ms`)
                .setColor('RANDOM')
                .setFooter(message.author.tag)
                m.edit(embed)
            });
        }

        //lovemeter command
        if (command === 'lovemeter' || command === 'lm'){
            let user;

            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else if (args[0]) {
                return message.reply('wrong argument. please mention somebody to use this command!');
            } else {
                return message.reply('mention somebody, you suck!');
            }

            var youGen = 'Male';
            var genMem = 'Male';
            var state = 'Love Meter';
            var num = getRandomInt(0, 100);
            var member = message.mentions.members.first();
            if (member.roles.cache.has('548317703790919712')) genMem = 'Female';
            if (message.member.roles.cache.has('548317703790919712')) youGen = 'Female';
            if (youGen == genMem) state = 'Gay Meter';

            const lovemeter = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.username+' and '+user.username, message.author.displayAvatarURL({ dynamic: true }))
            .addFields({name: message.author.username, value: youGen, inline: true},
                    {name: state, value: num+'%', inline: true},
                    {name: user.username, value: genMem, inline: true}
                );
            return message.channel.send(lovemeter); 
        }

        //is command
        if (command === 'is'){
            var ans = getRandomInt(0,1);

            if (!args[0]) return message.reply('you need to provide question');
            if (ans == 0){
                return  message.channel.send('Yes!');
            }
            return message.channel.send('No!');
        }

        //info command
        if (command === 'info'){
            let user;
            if (message.mentions.users.first()) {
                user = message.mentions.users.first();
            } else if (args[0]) {
                user = message.guild.members.cache.get(args[0]).user;
            } else {
                user = message.author;
            }
            var memGuild = message.guild.member(user);
            var dateCreated = new Date(user.createdAt);
            var dateJoin = new Date(memGuild.joinedAt);

            //get formated date Created
            var year = dateCreated.getFullYear();
            var month = indoMonth(dateCreated.getMonth());
            var date = dateCreated.getDate();
            var day = indoDay(dateCreated.getDay());
            //get formated date Joined
            var yearj = dateJoin.getFullYear();
            var monthj = indoMonth(dateJoin.getMonth());
            var datej = dateJoin.getDate();
            var dayj = indoDay(dateJoin.getDay());

            var nick = memGuild.nickname;
            var id = user.id;
            var tag = user.tag;
            var avatar = user.displayAvatarURL({dynamic: true});
            var username = user.username;
            
            const info = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${username} information`)
            .setAuthor(tag, avatar)
            .setDescription('Some description here')
            .setThumbnail(avatar)
            .addFields(
                { name: 'Date Created', value: `${day} ${date}-${month}-${year}`, inline: false },
                { name: 'Date Joined', value: `${dayj} ${datej}-${monthj}-${yearj}`, inline: false },
            )
            .addField('Nickname', nick, false)
            .setTimestamp();

            message.channel.send(info);
            

            console.log(`created at : ${day} ${date}-${month}-${year} ${nick}`);
        }
    }
});

client.login(token);
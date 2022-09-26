require('dotenv').config();
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');


const jokes = [
    'Two bytes meet.  The first byte asks, “Are you ill?”\nThe second byte replies, “No, just feeling abit off.”',
    'Eight bytes walk into a bar.  The bartender asks, “Can I get you anything?”\n“Yeah,” reply the bytes.  “Make us a double.”',
    'Q. How did the programmer die in the shower?\nA. He read the shampoo bottle instructions: Lather. Rinse. Repeat.',
    'How many programmers does it take to change a light bulb?\nNone – It’s a hardware problem',
    'Why do programmers always mix up Halloween and Christmas?\nBecause Oct 31 equals Dec 25.',
    'There are only 10 kinds of people in this world: those who know binary and those who don’t.',
    'A programmer walks to the butcher shop and buys a kilo of meat.\nAn hour later he comes back upset that the butcher shortchanged him by 24 grams.',
    '“Knock, knock.”\n“Who’s there?”\nvery long pause….\n“Java.”',
    'Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.',
    'Programming is like sex:\nOne mistake and you have to support it for the rest of your life.'
];



const client = new Discord.Client(
    {
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMessages,
            Discord.GatewayIntentBits.GuildMessageReactions
        ],
        partials: [
            Discord.Partials.Message,
            Discord.Partials.Channel,
            Discord.Partials.Reaction
        ]
    }
);


client.on('ready', () => {
    console.log('bot is ready');
});

const jokeCommand = '?joke';

client.on('messageCreate', (msg) => {
    if (!msg.author.bot && msg.content.includes(jokeCommand)) {
        const rand = Math.floor(Math.random() * jokes.length);
        msg.reply(jokes[rand]);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == '1023738780575858780') {
        if (reaction.emoji.name == '🦊') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.add('1023731982250819656');
        }
        if (reaction.emoji.name == '🐯') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.add('1023738882627469332');
        }
        if (reaction.emoji.name == '🐍') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.add('1023739008599212062');
        }
    }
    else return;
});


client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.partial.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == '1023738780575858780') {
        if (reaction.emoji.name == '🦊') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.remove('1023731982250819656');
        }
        if (reaction.emoji.name == '🐯') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.remove('1023738882627469332');
        }
        if (reaction.emoji.name == '🐍') {
            await reaction.message.guild.members.cache
                .get(user.id).roles.remove('1023739008599212062');
        }
    }
    else return;
});



client.login(process.env.DISCORD_TOKEN);
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { token, welcomeChannelId } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
        .setColor('#00ff99')  // Changed the color to a more vibrant green
        .setTitle('🎉 Välkommen till server! 🎉')
        .setDescription(`Hej ${member}, vi är glada över att ha dig här! Se till att kolla in reglerna.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Komma igång', value: 'Kolla in #rules för att förstå våra regler.' },
            { name: 'Panel url', value: 'https://panel.penguinhosting.host' },
            { name: 'Behöver hjälp?', value: 'Bara att skriva om du behöver hjälp :smiling_face_with_3_hearts:' }
        )
        .setURL('https://example.com')  // Link to your website or a relevant page
        .setImage('https://example.com/welcome-banner.png')  // A welcome banner image URL
        .setFooter({ text: 'Vi hoppas att du har det bra här!', iconURL: 'https://example.com/footer-icon.png' })
        .setTimestamp();

    welcomeChannel.send({ embeds: [embed] });
});

client.login(token);

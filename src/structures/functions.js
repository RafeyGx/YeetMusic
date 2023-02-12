const { Collection, MessageEmbed } = require("discord.js");

//===================≈==========================================================================================//
//                                                                                                              //
//                        Cooldown Function for Message Commands                                                //
//                                                                                                              //
//===================≈==========================================================================================//
function msgcooldown (message, command) {
    if (!message || !message.client) throw 'No Message with a valid DiscordClient granted as First Parameter';
    if (!command || !command.name) throw 'No Command with a valid name granted as Second Parameter';
    const client = message.client;
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.member.id)) {
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeleft = (expirationTime - now) / 1000;
            return timeleft
        } else {
            timestamps.set(message.member.id, now);
            setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
            return false;
        }
    } else {
        timestamps.set(message.member.id, now);
        setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
        return false
    }
}
//===================≈==========================================================================================//
//                                                                                                              //
//                         Cooldown Function for Interactions                                                   //
//                                                                                                              //
//===================≈==========================================================================================//
function slashcooldown (interaction, cmd) {
    if (!interaction || !interaction.client) throw 'No Interaction with a valid DiscordClient granted as First Parameter';
    if (!cmd || !cmd.name) throw 'No Command with a valid name granted as Second Parameter';
    const client = interaction.client;
    if (!client.cooldowns.has(cmd.name)) {
        client.cooldowns.set(cmd.name, new Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(cmd.name);
    const cooldownAmount = (cmd.cooldown || 1) * 1000;
    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeleft = (expirationTime - now) / 1000;
            return timeleft
        } else {
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            return false;
        }
    } else {
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        return false
    }
}
//===================≈==========================================================================================//
//                                                                                                              //
//                               Function for Formatting Numbers                                                //
//                                                                                                              //
//===================≈==========================================================================================//
/*function nFormatter(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}*/
//===================≈==========================================================================================//
//                                                                                                              //
//                               Error Manager for Message Commands                                             //
//                                                                                                              //
//===================≈==========================================================================================//
/*function msgerrlogs (client, message, error) {
    client.logger.log(error.stack, "error")
    client.channels.cache.get(Config.SETTINGS.ErrorChannel).send({
        embeds: [
            new MessageEmbed()
                .setColor(Embed.wrongcolor)
                .setAuthor(`${message.guild.name}\n[${message.guild.id}]`, message.guild.iconURL({ dynamic: true }))
                .setTitle(`${Emoji.Message.ERROR} Error System [MESSAGE COMMANDS]`)
                .setDescription(`_An error has occured_.\n\n**Error Code:** \`${error.name}\`\n**Error Message:** \`${error.message}\`\n**Stack:** \`\`\`yml\n${error.stack}\`\`\``)
                .setFooter(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB | CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% | Ping: ${Date.now() - message.createdTimestamp}ms`)
            ]
    });

    client.channels.cache.get(message.channel.id).send({
        embeds: [
            new MessageEmbed()
                .setColor(Embed.wrongcolor)
                .setTitle(`${Emoji.Message.ERROR} ${message.author.tag} => Error System`)
                .setDescription('_An error has occured_')
                .setFooter(`${Embed.footertext} · v${version}`, message.client.user.displayAvatarURL())
            ]
        }).then(m => setTimeout(() => m.delete(), 6000));
}
//===================≈==========================================================================================//
//                                                                                                              //
//                               Error Manager for Message Commands                                             //
//                                                                                                              //
//===================≈==========================================================================================//
function interactionerrlogs (client, interaction, error) {
    client.logger.log(error.stack, "error")
    client.channels.cache.get(Config.SETTINGS.ErrorChannel).send({
        embeds: [
            new MessageEmbed()
                .setColor(Embed.wrongcolor)
                .setAuthor(`${interaction.guild.name}\n[${interaction.guild.id}]`, interaction.guild.iconURL({ dynamic: true }))
                .setTitle(`${Emoji.Message.ERROR} Error System [INTERACTION COMMANDS]`)
                .setDescription(`_An error has occured_.\n\n**Error Code:** \`${error.name}\`\n**Error Message:** \`${error.message}\`\n**Stack:** \`\`\`yml\n${error.stack}\`\`\``)
                .setFooter(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB | CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% | Ping: ${Date.now() - interaction.createdTimestamp}ms`)
            ]
        });
}*/
//===================≈==========================================================================================//
//                                                                                                              //
//                                   Exporting all Modules                                                      //
//                                                                                                              //
//===================≈==========================================================================================//
module.exports = {
    msgcooldown,
    slashcooldown
	  }
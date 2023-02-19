
module.exports = {
	name: "eval",
	aliases: [''],
	description: "Evaluates any Js code",
	category: "owner",
	ownerOnly: true,
	
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
	const embed = new MessageEmbed().addField('Input', '```js\n' + args.join(' ') + '```');
    try {
      const code = args.join(' ');
      if (!code) return message.channel.send('Please include the code.');
      let evaled;

      if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes('process.env')) {
        evaled = 'No, shut up, what will you do it with the token?';
      } else {
        evaled = await eval(code);
      }

      if (typeof evaled !== 'string') evaled = await require('util').inspect(evaled, { depth: 0 });

      let output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post('https://hastebin.com/documents').send(output);
        embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor(client.embedColor);
      } else {
        embed.addField('Output', '```js\n' + output + '```').setColor(client.embedColor);
      }

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post('https://hastebin.com/documents').send(err);
        embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor('RED');
      } else {
        embed.addField('Output', '```js\n' + err + '```').setColor('RED');
      }

      message.channel.send({ embeds: [embed] });
    }
  },
	}

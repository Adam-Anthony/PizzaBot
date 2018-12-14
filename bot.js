const Discord = require('discord.js');
const client = new Discord.Client();

var dotenv = require('dotenv');
dotenv.load();

const pizzaball = client.emojis.find(emoji => emoji.name === "pizzaball");

const pizex = /time\s?to\s?deliver\s?a\s?pizza\s?ball/i;
const bait = /it('| i)?s\s?time/i;
const hook = /for\swhat/i;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.author.bot) return;
	if (msg.deleted) return;

	var arg = msg.content;

	if (pizex.test(arg)) {
		msg.channel.send('<:pizzaball:463530413844070401>');
	}
	if (bait.test(arg)){
		var promise = new Promise(function(resolve, reject) {
                const gottem = new Discord.MessageCollector(msg.channel, m => m.author !== msg.author, {time: 30000});
                //console.log(gottem);
                gottem.on('collect', clct => {
                    //console.log('collected');
                    var fol = clct.content; 
                    if (hook.test(fol)){
						msg.channel.send({files: 
							[{attachment: './timeBall.gif'}]
						}).then(result => {gottem.stop('delivered');
					});
                	}
                });

                gottem.on('end', (col, reason) => {
                    resolve(reason);
                });
            });
		promise.then(function(value) {
			console.log(value);
		})
	}
});

client.login(process.env.BOT_TOKEN);
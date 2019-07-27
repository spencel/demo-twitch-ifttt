// Put sensitive authorization keys and other environment variables in a file that is not pushed to a git repository
import dotenv from 'dotenv'
// Get messages from twitch chat
import tmi from 'tmi.js'
// Send and receive http requests and responses
import axios from 'axios'

// Get environment veriables
// For example: process.env.MY_ENVIRONMENT_VARIABLE
dotenv.config()

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: 'aws',
		reconnect: true
	},
	identity: {
		// Use the bot user account
		username: 'AnArmored3LeggedGuardCow',
		password: process.env.TWITCH_CHAT_OAUTH_PASSWORD
	},
	// List of channels to join
	channels: [
		'anarmored3leggedguardcow',
		'secretreagent',
		'topgunn7'
		// other channels
	]
}

// Create a new tmi client for the bot
let tmiClient = new tmi.client( options )
// Connect bot to twitch channel(s)
tmiClient.connect()

// Event on 'action', 'chat', or 'whisper
tmiClient.on( 'cheer', ( channel, userstate, message ) => {
	
	// The following console.log methods print the values of the specified variables and objects to the console for development purposes.

	console.log( channel )
	// Example: #mychannel
	
	console.log( userstate )
	// Example:
	/*
		{ 
			'badge-info': null,
		  badges: { bits: '100' },
		  bits: '10',
		  color: '#CC00AD',
		  'display-name': 'SecretReagent',
		  emotes: null,
		  flags: null,
		  id: 'c7d85704-2121-4e3c-b30a-3c9d20ec4342',
		  mod: false,
		  'room-id': '69787196',
		  subscriber: false,
		  'tmi-sent-ts': '1564193702048',
		  turbo: false,
		  'user-id': '45264620',
		  'user-type': null,
		  'emotes-raw': null,
		  'badge-info-raw': null,
		  'badges-raw': 'bits/100',
		  username: 'secretreagent'
		}
  */
	
	console.log( message )
	// Example: Cheer1 Cheer1 Cheer1 Cheer1 Cheer1 Cheer1 Cheer1 Cheer1 Cheer1 Cheer1

	axios.post( `https://maker.ifttt.com/trigger/twitchChatCommand2/with/key/${process.env.TFTTT_API_KEY}`, {
			'value1': userstate.username,
			'value2': userstate.bits,
			'value3': channel
		})
		.then( res => {
			// console.log( `statusCode: ${res.statusCode}`)
		})
		.catch( error => {
			console.log( 'error' )
			//console.log( error )
		})


})
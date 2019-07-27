// Put sensitive authorization keys and other environment variables in a file that is not pushed to a git repository
import dotenv from 'dotenv'
// Send and receive http requests and responses
import axios from 'axios'

// Get environment veriables
// For example: process.env.MY_ENVIRONMENT_VARIABLE
dotenv.config()

let colors = [ 'red', 'green', 'blue' ]
let i = 0
setInterval( () => {

	// Cycle through the list of colors
	if ( i > ( colors.length - 2 ) ) {
		// Go back to first color in the list if end of list was reached
		i = 0
	} else {
		// Otherwise, go to the next color in the list
		i++
	}
	// Get the color from the list at the specified index determined above
	let color = colors[ i ]
	console.log( i )
	console.log( color )

	// Send a request to the URL below, a trigger will have to be created
	axios.post( `https://maker.ifttt.com/trigger/kasa_bulb_change_color/with/key/${process.env.TFTTT_API_KEY}`, {
			'value1': color,
			'value2': undefined,
			'value3': undefined
		})
		.then( res => {
			// console.log( `statusCode: ${res.statusCode}`)
		})
		.catch( error => {
			console.log( 'error' )
			//console.log( error )
		})	
}, 6000 )


if (!process.platform === 'darwin') {
  process.exit()
}

const applescript = require('applescript')

const script = `
  tell application "Adobe XD CC"
	  activate
	  tell application "System Events"
		  key code 15 using {command down, shift down}
	  end tell
  end tell
`

applescript.execString(script)

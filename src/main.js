// Dependencies
const fs = require('uxp').storage.localFileSystem
const application = require('application')
const clipboard = require('clipboard')
const commands = require('commands')
const { createDialog, error } = require('./lib/dialogs.js')

// Main function
async function copySvgCode(selection) {
  // Error if nothing selected
  if (!selection.hasArtwork) {
    error('No SVG selected', 'Please select an SVG before running.')
    return
  }

  // Group if multiple selections
  if (selection.items.length >= 2) {
    commands.group()
  }

  // Setup tmp folder and file
  const tmpFolder = await fs.getTemporaryFolder()
  const file = await tmpFolder.createFile('export.svg', {
    overwrite: true
  })

  // Rendition settings
  const renditions = [
    {
      node: selection.items[0],
      outputFile: file,
      type: application.RenditionType.SVG,
      minify: true,
      embedImages: false
    }
  ]

  // Create rendition
  await application.createRenditions(renditions)

  // Read tmp file and generate SVG code
  const markup = await file.read()
  const svgCode = escapeHtml(markup)

  // Show output dialog
  await createDialog({
    title: 'SVG Output',
    template: () => `<textarea>${svgCode}</textarea>`
  })

  // Copy to clipboard too!
  clipboard.copyText(markup)
}

// Helper(s)
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Exports
module.exports = {
  commands: {
    copySvgCode
  }
}

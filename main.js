module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/dialogs.js":
/*!****************************!*\
  !*** ./src/lib/dialogs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/AdobeXD/plugin-samples/blob/master/how-to-display-an-alert/lib/dialogs.js

/*
 * Copyright 2018 Adobe Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { getManifest, getNearestIcon } = __webpack_require__(/*! ./manifest.js */ "./src/lib/manifest.js");

let manifest;

/**
 * Converts a string (or an array of strings or other objects) to a nicer HTML
 * representation. Essentially this is a _very_ basic markdown parser.
 *
 * The following tokens are understood, when encountered at the beginning of
 * a string:
 *
 * Token        | Result
 * -------------|-----------------------
 * `##`         | `<h2>`
 * `###`        | `<h3>`
 * `* `         | Bulleted list
 * `----`       | `<hr class="small">`
 * `---`        | `<hr />`
 * `[...](href)`| `<p><a href="href">...</a></p>`
 *
 * @param {string | string[] | * | Array<*>} str
 * @returns {string} the HTML representation
 */
function strToHtml(str) {
  // allow some common overloads, including arrays and non-strings
  if (Array.isArray(str)) {
    return str.map(str => strToHtml(str)).join('');
  }
  if (typeof str !== 'string') {
    return strToHtml(`${str}`);
  }

  let html = str;

  // handle some markdown stuff
  if (html.substr(0, 2) === '##') {
    html = `<h3>${html.substr(2).trim().toUpperCase()}</h3>`;
  } else if (html.substr(0, 1) === '#') {
    html = `<h2>${html.substr(1).trim()}</h2>`;
  } else if (html.substr(0, 2) === '* ') {
    html = `<p class="list"><span class="bullet margin">•</span><span class="margin">${html.substr(2).trim()}</span></p>`;
  } else if (html.substr(0, 4) === '----') {
    html = `<hr class="small"/>${html.substr(5).trim()}`;
  } else if (html.substr(0, 3) === '---') {
    html = `<hr/>${html.substr(4).trim()}`;
  } else {
    html = `<p>${html.trim()}</p>`;
  }

  // handle links -- the catch here is that the link will transform the entire paragraph!
  const regex = /\[([^\]]*)\]\(([^\)]*)\)/;
  const matches = str.match(regex);
  if (matches) {
    const title = matches[1];
    const url = matches[2];
    html = `<p><a href="${url}">${html.replace(regex, title).replace(/\<\|?p\>/g, '')}</a></p>`;
  }

  return html;
}

/*
 * Generates a "notice" dialog with the title, default icon, and a series of messages.
 *
 * @param {*} param
 * @property {string} param.title The dialog title
 * @property {string} [param.icon] The dialog icon to use. If not provided, no icon will be rendered
 * @property {string[]} param.msgs The messages to render. If a message starts with `http`, it will be rendered as a link.
 * @property {string} [param.prompt] If specified, will render as a prompt with a single input field and the prompt as a placeholder
 * @property {boolean} [param.multiline=false] If `true`, the prompt will render as a multi-line text field.
 * @property {boolean} [param.isError=false] If specified, will render the header in a red color
 * @property {Function} [param.render] If set, the results of this function (a DOM tree) will be appended into the content area of the dialog.
 * @property {Function<String>} [param.template] If set, the results of this function (a string) will be appended into the content area of the dialog.
 * @property {Object[]} [buttons] Indicates the buttons to render. If none are specified, a `Close` button is rendered.
 * @returns {Promise} Resolves to an object of the form {which, value}. `value` only makes sense if `prompt` is set. `which` indicates which button was pressed.
 */
async function createDialog({
  title,
  icon = 'plugin-icon',
  msgs,
  prompt,
  multiline = false,
  render,
  template,
  isError = false,
  buttons = [
    { label: 'Close', variant: 'cta', type: 'submit' }
  ] } = {},
  width = 360,
  height = 'auto',
  iconSize = 18
) {

  let messages = Array.isArray(msgs) ? msgs : [msgs];

  try {
    if (!manifest) {
      manifest = await getManifest();
    }
  } catch (err) {
    // do nothing
  }

  let usingPluginIcon = false;
  if (icon === 'plugin-icon') {
    if (manifest.icons) {
      usingPluginIcon = true;
      iconSize = 24;
      icon = getNearestIcon(manifest, iconSize);
    }
  }

  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
<style>
    form {
        width: ${width}px;
    }
    .h1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .h1 img {
        width: ${iconSize}px;
        height: ${iconSize}px;
        flex: 0 0 ${iconSize}px;
        padding: 0;
        margin: 0;
    }
    img.plugin-icon {
        border-radius: 4px;
        overflow: hidden;
    }
    .list {
        display: flex;
        flex-direction: row;
    }
    .list .margin {
        margin-bottom: 0;
        margin-left: 0;
    }
    .list span {
        flex: 0 0 auto;
        border: 1px solid transparent;
    }
    .list .bullet {
        text-align: center;
    }
    .list + .list {
        margin-top: 0;
    }
    textarea {
        height: 200px;
    }
    .container {
        zoverflow-x: hidden;
        overflow-y: auto;
        height: ${height === 'auto' ? height : `${height}px`};
    }
</style>
<form method="dialog">
    <h1 class="h1">
        <span ${isError ? `class="color-red"` : ""}>${title}</span>
        ${icon ? `<img ${usingPluginIcon ? `class="plugin-icon" title="${manifest.name}"` : ''} src="${icon}" />` : ''}
    </h1>
    <hr />
    <div class="container">
        ${
    !render && (
      template ? template() : (
        messages.map(msg => strToHtml(msg)).join('') +
        (prompt ? `<label>${
          multiline ?
            `<textarea id="prompt" placeholder="${prompt}"></textarea>` :
            `<input type="text" id="prompt" placeholder="${prompt}" />`
          }</label>` : '')
      )
    )
    }
    </div>
    <footer>
        ${buttons.map(({ label, type, variant } = {}, idx) => `<button id="btn${idx}" type="${type}" uxp-variant="${variant}">${label}</button>`).join('')}
    </footer>
</form>
    `;

  // if render fn is passed, we'll call it and attach the DOM tree
  if (render) {
    dialog.querySelector(".container").appendChild(render());
  }

  // The "ok" and "cancel" button indices. OK buttons are "submit" or "cta" buttons. Cancel buttons are "reset" buttons.
  let okButtonIdx = -1;
  let cancelButtonIdx = -1;
  let clickedButtonIdx = -1;

  // Ensure that the form can submit when the user presses ENTER (we trigger the OK button here)
  const form = dialog.querySelector('form');
  form.onsubmit = () => dialog.close('ok');

  // Attach button event handlers and set ok and cancel indices
  buttons.forEach(({ type, variant } = {}, idx) => {
    const button = dialog.querySelector(`#btn${idx}`);
    if (type === 'submit' || variant === 'cta') {
      okButtonIdx = idx;
    }
    if (type === 'reset') {
      cancelButtonIdx = idx;
    }
    button.onclick = e => {
      e.preventDefault();
      clickedButtonIdx = idx;
      dialog.close(idx === cancelButtonIdx ? 'reasonCanceled' : 'ok');
    }
  });

  try {
    document.appendChild(dialog);
    const response = await dialog.showModal();
    if (response === 'reasonCanceled') {
      // user hit ESC
      return { which: cancelButtonIdx, value: '' };
    } else {
      if (clickedButtonIdx === -1) {
        // user pressed ENTER, so no button was clicked!
        clickedButtonIdx = okButtonIdx; // may still be -1, but we tried
      }
      return { which: clickedButtonIdx, value: prompt ? dialog.querySelector('#prompt').value : '' };
    }
  } catch (err) {
    // system refused the dialog
    return { which: cancelButtonIdx, value: '' };
  } finally {
    dialog.remove();
  }
}

/**
 * Generates an alert message
 *
 * @param {string} title
 * @param {string[]} msgs
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function alert(title, ...msgs) {
  return createDialog({ title, msgs });
}

/**
 * Generates a warning message
 *
 * @param {string} title
 * @param {string[]} msgs
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function error(title, ...msgs) {
  return createDialog({ title, isError: true, msgs });
}

/**
 * Displays a confirmation dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function confirm(title, msg, buttons = ['Cancel', 'OK']) {
  return createDialog({
    title, msgs: [msg], buttons: [
      { label: buttons[0], type: 'reset', variant: 'primary' },
      { label: buttons[1], type: 'submit', variant: 'cta' }
    ]
  });
}

/**
 * Displays a warning dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function warning(title, msg, buttons = ['Cancel', 'OK']) {
  return createDialog({
    title, msgs: [msg], buttons: [
      { label: buttons[0], type: 'submit', variant: 'primary' },
      { label: buttons[1], type: 'button', variant: 'warning' }
    ]
  });
}

/**
 * Displays a warning dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string} prompt
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @param {boolean} [multiline = false] If `true`, a multiline textarea will be used instead of a single line editor.
 * @returns {Promise<{which: number, value: string}>} `which` indicates which button was clicked, and `value` indicates the entered value in the text field.
 */
async function prompt(title, msg, prompt, buttons = ['Cancel', 'OK'], multiline = false) {
  return createDialog({
    title, msgs: [msg], prompt, multiline, buttons: [
      { label: buttons[0], type: 'reset', variant: 'primary' },
      { label: buttons[1], type: 'submit', variant: 'cta' }
    ]
  });
}

module.exports = {
  createDialog,
  alert,
  error,
  confirm,
  warning,
  prompt
};


/***/ }),

/***/ "./src/lib/manifest.js":
/*!*****************************!*\
  !*** ./src/lib/manifest.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/AdobeXD/plugin-samples/blob/master/how-to-display-an-alert/lib/manifest.js

/*
 * Copyright 2018 Adobe Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let manifest

/**
 * Reads the plugin's manifest and returns the parsed contents.
 *
 * Throws if the manifest is invalid or doesn't exist.
 *
 * Note: Reads manifest only once. Future calls will not reload
 * the manifest file.
 */
async function getManifest() {
  if (!manifest) {
    const fs = __webpack_require__(/*! uxp */ "uxp").storage.localFileSystem
    const dataFolder = await fs.getPluginFolder()
    const manifestFile = await dataFolder.getEntry('manifest.json')
    if (manifestFile) {
      const json = await manifestFile.read()
      manifest = JSON.parse(json)
    }
  }
  return manifest
}

/**
 * Return the icon path that can fit the requested size without upscaling.
 *
 * @param {*} manifest
 * @param {number} size
 * @returns {string} path to the icon
 */
function getNearestIcon(manifest, size) {
  if (!manifest) {
    return
  }

  if (manifest.icons) {
    // icons is an array of objects of the form
    // { width, height, path }

    // icons are assumed to be square, so we'll sort descending on the width
    const sortedIcons = manifest.icons.sort((a, b) => {
      const iconAWidth = a.width
      const iconBWidth = b.width
      return iconAWidth < iconBWidth ? 1 : iconAWidth > iconBWidth ? -1 : 0
    })

    // next, search until we find an icon _too_ small for the desired size
    const icon = sortedIcons.reduce((last, cur) => {
      if (!last) {
        last = cur
      } else {
        if (cur.width >= size) {
          last = cur
        }
      }
      return last
    })

    return icon.path
  }
}

module.exports = {
  getManifest,
  getNearestIcon
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Dependencies
const fs = __webpack_require__(/*! uxp */ "uxp").storage.localFileSystem
const application = __webpack_require__(/*! application */ "application")
const clipboard = __webpack_require__(/*! clipboard */ "clipboard")
const { createDialog, error } = __webpack_require__(/*! ./lib/dialogs.js */ "./src/lib/dialogs.js")

// Main function
async function copySvgCode(selection) {
  // Error if nothing selected
  if (!selection.hasArtwork) {
    error('No SVG selected', 'Please select an SVG before running.')
    return
  }

  // Error if multiple selections and not grouped
  if (selection.items.length >= 2) {
    error(
      'Too many selections',
      'Please select one SVG or group multiple together.'
    )
    return
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


/***/ }),

/***/ "application":
/*!******************************!*\
  !*** external "application" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("application");

/***/ }),

/***/ "clipboard":
/*!****************************!*\
  !*** external "clipboard" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("clipboard");

/***/ }),

/***/ "uxp":
/*!**********************!*\
  !*** external "uxp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uxp");

/***/ })

/******/ });
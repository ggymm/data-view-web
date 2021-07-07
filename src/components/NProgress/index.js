const NProgress = {}

NProgress.version = '0.2.0'

const Settings = NProgress.settings = {
  minimum: 0.08,
  easing: 'ease',
  positionUsing: '',
  speed: 200,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  showSpinner: true,
  barSelector: '[role="bar"]',
  spinnerSelector: '[role="spinner"]',
  parent: 'body',
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
}

/**
 * Updates configuration.
 *
 *     NProgress.configure({
 *       minimum: 0.1
 *     });
 */
NProgress.configure = function(options) {
  let key, value
  for (key in options) {
    value = options[key]
    if (value !== undefined) Settings[key] = value
  }

  return this
}

/**
 * Last number.
 */

NProgress.status = null

/**
 * (Internal) Applies css properties to an element, similar to the jQuery
 * css method.
 *
 * While this helper does assist with vendor prefixed property names, it
 * does not perform any manipulation of values prior to setting styles.
 */
const css = (function() {
  const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']
  const cssProps = {}

  function camelCase(string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase()
    })
  }

  function getVendorProp(name) {
    const style = document.body.style
    if (name in style) return name

    let i = cssPrefixes.length
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
    let vendorName
    while (i--) {
      vendorName = cssPrefixes[i] + capName
      if (vendorName in style) return vendorName
    }

    return name
  }

  function getStyleProp(name) {
    name = camelCase(name)
    return cssProps[name] || (cssProps[name] = getVendorProp(name))
  }

  function applyCss(element, prop, value) {
    prop = getStyleProp(prop)
    element.style[prop] = value
  }

  return function(element, properties) {
    const args = arguments
    let prop
    let value

    if (args.length === 2) {
      for (prop in properties) {
        value = properties[prop]
        if (value !== undefined) applyCss(element, prop, value)
      }
    } else {
      applyCss(element, args[1], args[2])
    }
  }
})()
/**
 * (Internal) Queues a function to be executed.
 */
const queue = (function() {
  const pending = []

  function next() {
    const fn = pending.shift()
    if (fn) {
      fn(next)
    }
  }

  return function(fn) {
    pending.push(fn)
    if (pending.length === 1) next()
  }
})()
/**
 * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
 *
 *     NProgress.set(0.4);
 *     NProgress.set(1.0);
 */

NProgress.set = function(n) {
  const started = NProgress.isStarted()

  n = clamp(n, Settings.minimum, 1)
  NProgress.status = (n === 1 ? null : n)

  const progress = NProgress.render(!started)
  const bar = progress.querySelector(Settings.barSelector)
  const speed = Settings.speed
  const ease = Settings.easing

  progress.offsetWidth /* Repaint */

  queue(function(next) {
    // Set positionUsing if it hasn't already been set
    if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS()

    // Add transition
    css(bar, barPositionCSS(n, speed, ease))

    if (n === 1) {
      // Fade out
      css(progress, {
        transition: 'none',
        opacity: 1
      })
      progress.offsetWidth /* Repaint */

      setTimeout(function() {
        css(progress, {
          transition: 'all ' + speed + 'ms linear',
          opacity: 0
        })
        setTimeout(function() {
          NProgress.remove()
          next()
        }, speed)
      }, speed)
    } else {
      setTimeout(next, speed)
    }
  })

  return this
}

NProgress.isStarted = function() {
  return typeof NProgress.status === 'number'
}

/**
 * Shows the progress bar.
 * This is the same as setting the status to 0%, except that it doesn't go backwards.
 *
 *     NProgress.start();
 *
 */
NProgress.start = function() {
  if (!NProgress.status) NProgress.set(0)

  const work = function() {
    setTimeout(function() {
      if (!NProgress.status) return
      NProgress.trickle()
      work()
    }, Settings.trickleSpeed)
  }

  if (Settings.trickle) work()

  return this
}

/**
 * Hides the progress bar.
 * This is the *sort of* the same as setting the status to 100%, with the
 * difference being `done()` makes some placebo effect of some realistic motion.
 *
 *     NProgress.done();
 *
 * If `true` is passed, it will show the progress bar even if its hidden.
 *
 *     NProgress.done(true);
 */

NProgress.done = function(force) {
  if (!force && !NProgress.status) return this

  return NProgress.inc(0.3 + 0.5 * Math.random()).set(1)
}

/**
 * Increments by a random amount.
 */

NProgress.inc = function(amount) {
  let n = NProgress.status

  if (!n) {
    return NProgress.start()
  } else {
    if (typeof amount !== 'number') {
      amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95)
    }

    n = clamp(n + amount, 0, 0.994)
    return NProgress.set(n)
  }
}

NProgress.trickle = function() {
  return NProgress.inc(Math.random() * Settings.trickleRate)
};

/**
 * Waits for all supplied jQuery promises and
 * increases the progress as the promises resolve.
 *
 * @param $promise jQuery Promise
 */
(function() {
  let initial = 0
  let current = 0

  NProgress.promise = function($promise) {
    if (!$promise || $promise.state() === 'resolved') {
      return this
    }

    if (current === 0) {
      NProgress.start()
    }

    initial++
    current++

    $promise.always(function() {
      current--
      if (current === 0) {
        initial = 0
        NProgress.done()
      } else {
        NProgress.set((initial - current) / initial)
      }
    })

    return this
  }
})()

/**
 * (Internal) renders the progress bar markup based on the `template`
 * setting.
 */

NProgress.render = function(fromStart) {
  if (NProgress.isRendered()) return document.getElementById('nprogress')

  addClass(document.documentElement, 'nprogress-busy')

  const progress = document.createElement('div')
  progress.id = 'nprogress'
  progress.innerHTML = Settings.template

  const bar = progress.querySelector(Settings.barSelector)
  const percent = fromStart ? '-100' : toBarPercent(NProgress.status || 0)
  const parent = document.querySelector(Settings.parent)
  let spinner

  css(bar, {
    transition: 'all 0 linear',
    transform: 'translate3d(' + percent + '%,0,0)'
  })

  if (!Settings.showSpinner) {
    spinner = progress.querySelector(Settings.spinnerSelector)
    spinner && removeElement(spinner)
  }

  if (parent !== document.body) {
    addClass(parent, 'nprogress-custom-parent')
  }

  parent.appendChild(progress)
  return progress
}

/**
 * Removes the element. Opposite of render().
 */

NProgress.remove = function() {
  removeClass(document.documentElement, 'nprogress-busy')
  removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent')
  const progress = document.getElementById('nprogress')
  progress && removeElement(progress)
}

/**
 * Checks if the progress bar is rendered.
 */

NProgress.isRendered = function() {
  return !!document.getElementById('nprogress')
}

/**
 * Determine which positioning CSS rule to use.
 */

NProgress.getPositioningCSS = function() {
  // Sniff on document.body.style
  const bodyStyle = document.body.style

  // Sniff prefixes
  const vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit'
    : ('MozTransform' in bodyStyle) ? 'Moz'
      : ('msTransform' in bodyStyle) ? 'ms'
        : ('OTransform' in bodyStyle) ? 'O' : ''

  if (vendorPrefix + 'Perspective' in bodyStyle) {
    // Modern browsers with 3D support, e.g. Webkit, IE10
    return 'translate3d'
  } else if (vendorPrefix + 'Transform' in bodyStyle) {
    // Browsers without 3D support, e.g. IE9
    return 'translate'
  } else {
    // Browsers without translate() support, e.g. IE7-8
    return 'margin'
  }
}

/**
 * Helpers
 */

function clamp(n, min, max) {
  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * (Internal) converts a percentage (`0..1`) to a bar translateX
 * percentage (`-100%..0%`).
 */

function toBarPercent(n) {
  return (-1 + n) * 100
}

/**
 * (Internal) returns the correct CSS for changing the bar's
 * position given an n percentage, and speed and ease from Settings
 */

function barPositionCSS(n, speed, ease) {
  let barCSS

  if (Settings.positionUsing === 'translate3d') {
    barCSS = { transform: 'translate3d(' + toBarPercent(n) + '%,0,0)' }
  } else if (Settings.positionUsing === 'translate') {
    barCSS = { transform: 'translate(' + toBarPercent(n) + '%,0)' }
  } else {
    barCSS = { 'margin-left': toBarPercent(n) + '%' }
  }

  barCSS.transition = 'all ' + speed + 'ms ' + ease

  return barCSS
}

/**
 * (Internal) Determines if an element or space separated list of class names contains a class name.
 */

function hasClass(element, name) {
  const list = typeof element === 'string' ? element : classList(element)
  return list.indexOf(' ' + name + ' ') >= 0
}

/**
 * (Internal) Adds a class to an element.
 */

function addClass(element, name) {
  const oldList = classList(element)
  const newList = oldList + name

  if (hasClass(oldList, name)) return

  // Trim the opening space.
  element.className = newList.substring(1)
}

/**
 * (Internal) Removes a class from an element.
 */

function removeClass(element, name) {
  const oldList = classList(element)

  if (!hasClass(element, name)) return

  // Replace the class name.
  const newList = oldList.replace(' ' + name + ' ', ' ')

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1)
}

/**
 * (Internal) Gets a space separated list of the class names on the element.
 * The list is wrapped with a single space on each end to facilitate finding
 * matches within the list.
 */

function classList(element) {
  return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ')
}

/**
 * (Internal) Removes an element from the DOM.
 */

function removeElement(element) {
  element && element.parentNode && element.parentNode.removeChild(element)
}

export default NProgress


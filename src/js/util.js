export const getSiblings = elem => {
  // Setup siblings array and get the first sibling
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }

  return siblings;
}

export const totalResult = (arr, initialValue) => {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue
    , initialValue)
}

export const delegate = (elSelector, eventName, selector, fn) => {

  elSelector.addEventListener(eventName, function (event) {
    var possibleTargets = elSelector.querySelectorAll(selector);
    var target = event.target;

    for (var i = 0, l = possibleTargets.length; i < l; i++) {
      var el = target;
      var p = possibleTargets[i];

      while (el && el !== elSelector) {
        if (el === p) {
          return fn.call(p, event);
        }

        el = el.parentNode;
      }
    }
  });
}

const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)

export const hideOnClickOutside = (element, fn) => {
  const outsideClickListener = event => {
    if (!element.contains(event.target) && isVisible(element)) {
      fn()
      removeClickListener()
    }
  }

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener)
}


import { useMemo, useCallback, useEffect } from "react";

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8
}

const shiftKeys = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  '$': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  '_': '-',
  '+': '=',
  '|': '\\',
  '{': '[',
  '}': ']',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
}

const aliases = {
  win: 'meta',
  window: 'meta',
  cmd: 'meta',
  command: 'meta',
  esc: 'escape',
  opt: 'alt',
  option: 'alt'
}
/*
const hotKeys = [
  {
    global: true,
    combo: 'ctrl+k',
    onKeyDown: e => {
      alert('ctrl+k');
    }
  }
]
*/

const getKeyCombo = e => {
  const key = e.key !== ' ' ? e.key.toLowerCase() : 'space';

  let modifiers = 0;
  if (e.altKey) modifiers += ModifierBitMasks.alt;
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl;
  if (e.metaKey) modifiers += ModifierBitMasks.meta;
  if (e.shiftKey) modifiers += ModifierBitMasks.shift;
  
  return { modifiers, key };
}

const parseKeyCombo = (combo) => {
  const pieces = combo.replace(/\s/g, '').toLowerCase().split('+');
  let modifiers = 0;
  let key;
  for (const piece of pieces) {
    if (ModifierBitMasks[piece]) {
      modifiers += ModifierBitMasks[piece];
    } else if (shiftKeys[piece]) {
      modifiers += ModifierBitMasks.shift;
      key = shiftKeys[piece];
    } else if (aliases[piece]){
      key = aliases[piece]
    } else {
      key = piece;
    }
  }

  return { modifiers, key }
}

const comboMatches = (a, b) => {
  return a.modifiers === b.modifiers && a.key === b.key;
}

const useHotKey = (hotKeys) => {
  const localKeys = useMemo(() => hotKeys.filter((k) => !k.global), [hotKeys]);
  const globalKeys = useMemo(() => hotKeys.filter((k) => k.global), [hotKeys]);

  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      for (const hotKey of global ? globalKeys : localKeys) {
        // TODO: 단축키 처리를 함.
        // callbackName: [onKeyDown, onKeyUp]
        if (comboMatches(parseKeyCombo(hotKey.combo), combo)) {
          hotKey[callbackName] && hotKey[callbackName](e);
        }
      }
    },
    [localKeys, globalKeys]
  );

  const handleGlobalKeyDown = useCallback((e) => {
    invokeCallback(true, getKeyCombo(e), 'onKeyDown', e);
  }, [invokeCallback]);

  const handleGlobalKeyUp = useCallback((e) => {
    invokeCallback(true, getKeyCombo(e), 'onKeyUp', e);
  }, [invokeCallback]);

  const handleLocalKeyDown = useCallback((e) => {
    invokeCallback(false, getKeyCombo(e), 'onKeyDown', e.nativeEvent);
  }, [invokeCallback]);

  const handleLocalKeyUp = useCallback((e) => {
    invokeCallback(false, getKeyCombo(e), 'onKeyUp', e.nativeEvent);
  }, [invokeCallback]);

  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('keyup', handleGlobalKeyUp);
  }, [handleGlobalKeyDown, handleGlobalKeyUp])

  // return { 
  //   handleLocalKeyDown, 
  //   handleGlobalKeyDown,
  //   handleGlobalKeyUp, 
  //   handleLocalKeyUp
  // }
  return { 
    handleKeyDown: handleLocalKeyDown, 
    handleKeyUp: handleLocalKeyUp
  }
};

export default useHotKey;

import { useState } from 'react';
import useHotKey from '../hooks/useHotKey'

export default {
  title: 'Hook/useHotKey'
}

export const Default = () => {
  const [value, setValue] = useState('')
  const hotKeys = [
    {
      global: true,
      combo: 'meta+shift+k',
      onKeyDown: e => {
        alert("meta+shift+k")
      }
    },
    {
      global: true,
      combo: 'esc',
      onKeyDown: e => {
        setValue('')
      }
    }
  ]

  const { handleKeyDown } = useHotKey(hotKeys);
  console.log(handleKeyDown)

  return <div>
    <div>useHotKey Shift Test</div>
    <input onKeyDown={handleKeyDown} value={value} onChange={e => setValue(e.target.value)}/>
  </div>
}

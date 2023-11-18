import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for(let i=0; i<length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword])

  const passwordRef = useRef(password);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, number, character, passwordGenerator])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="w-full max-w-md shadow-md bg-gray-800 text-orange-500 rounded-lg px-4 py-3 mx-2">
        <h1 className="text-3xl text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-xl h-10"
              placeholder="Password"
              readOnly
              ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 text-xl'
          >Copy</button>
        </div>
      
        <div className='flex text-sm justify-between'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-2'>
              <div className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={number}
                    id="numberInput"
                    onChange={() => {
                      setNumber((prev) => !prev);
                    }}
                    />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                    type="checkbox"
                    defaultChecked={character}
                    id="characterInput"
                    onChange={() => {
                      setCharacter((prev) => !prev )
                    }}
                    />
                <label htmlFor="characterInput">Characters</label>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default App

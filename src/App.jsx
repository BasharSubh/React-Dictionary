import { useState } from 'react'
import './App.css'
import playImg from "./assets/icons8-play-64.png"

function App() {

  const [data, setData] = useState([])
  const [word, setWord] = useState('')
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
   
      const data = await response.json()

      if (!response.ok) {
        setError(data)
        setData([])
      } else {
        setData(data)
        setError(null)
      }
        
    } catch (error) {
      if (error) {
        console.error(error)
      }
    }
  }

  const handleChange = (e) => {
    setWord(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      fetchData()
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">React Dictionary App</h2>
        </div>
        <div className="flex justify-center">
          <div className="flex w-full rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-l-md pl-5"
              placeholder="Enter a word"
              value={word}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="focus:outline-none bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-500 rounded-r-md"
              onClick={fetchData}
            >
              Search
            </button>
          </div>
        </div>
        <div className="text-center ">
          {error &&
            <>
            <h2 className="text-xl font-semibold text-red-500 p-4">{error.title}</h2>
            <p className="text-gray-600 m-1">{error.message}</p>
            <p className="text-gray-600 m-1">{error.resolution}</p>
            <hr/>
            </>
          }
        </div>
        {data.length > 0 ? (
          <>
          <div className="flex items-center">
          <span className="flex-1">
            <h1 className="text-7xl font-bold mb-0">{data[0]?.word}</h1>
            <p className="mt-3">{data[0]?.phonetics.filter(text => text.text)[0]?.text}</p>
          </span>
          <img src={playImg} className="ml-auto" alt='' onClick={() => document.getElementById('audioElement').play()} />
          <audio
            id="audioElement"
            controls
            src={data[0]?.phonetics.filter(audio => audio.audio)[0]?.audio}
            className="mt-2 hidden"
          />
        </div><hr />
        {data[0]?.meanings.map((meaning, meaningIndex) => (
          <div key={meaningIndex}>
          <h1 class="text-3xl font-bold text-blue-600 capitalize mb-4">{meaning.partOfSpeech}</h1>
            {meaning.definitions.map((definition, definitionIndex) => (
              <div key={definitionIndex} className='p-3 text-xl'>
            <li class="flex items-start mb-2">
              <span class="inline-block h-5 w-5 bg-blue-500 rounded-full mt-1 mr-2"></span>
              <p class="text-xlg font-bold leading-snug">{definition.definition}</p>
            </li>
              <p class="text-gray-600 italic pl-4">{definition.example}</p>
              </div>
            ))}<br />
          {meaning.synonyms.length > 0 && (
            <div class="bg-white p-4 rounded-lg shadow-md">
            <p class="font-bold">Synonyms:</p>
            <p>
              <span class="text-purple-600">
                {meaning.synonyms.join(', ')}
              </span>
            </p>
          </div>
          )}
          </div>
        ))}
            <hr className="my-6 border-gray-300" />
            <p class="text-gray-600">Source: <a href={data[0]?.sourceUrls[0]} class="text-blue-500">{data[0]?.sourceUrls[0]}</a></p>
          </>
        ) : (
            null
        )}   
        <footer class="text-center text-gray-600 py-4">
        <p>Built by Bashar Subh | <a href="https://github.com/BasharSubh/React-Dictionary" class="text-blue-500">GitHub</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
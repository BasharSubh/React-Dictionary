# React Dictionary App

React Dictionary App is a simple web application that allows users to search for word definitions using the Dictionary API. It is built with React and makes use of the useState hook for managing state and the fetch API for making HTTP requests.

https://comforting-toffee-9dd56c.netlify.app/

## Prerequisites
- Node.js
- React
- Tailwind css

## Usage
1. Enter a word in the input field and press Enter or click the Search button.
2. The app will fetch the definition for the entered word from the Dictionary API.
3. If the word is found, the definition, part of speech, example, and synonyms will be displayed.
4. You can click the play button next to the word to hear the pronunciation.
5. The source of the definition will be provided along with a link to the source website.

## API Key
The app uses the Dictionary API to fetch word definitions. 

```javascript
const fetchData = async () => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    // ...
  } catch (error) {
    // ...
  }
}
```
## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch
- Make your changes
- Submit a pull request

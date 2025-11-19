const InputWord = document.getElementById('inp-word')
const SearchBtn = document.getElementById('search-btn')
const ResultBlock = document.querySelector('.result')
const NotFound = document.querySelector('.not-found')
const sound = document.getElementById('sound')

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

async function fetchDict() {
	const word = InputWord.value
	if (word === '') {
		return
	}

	await fetch(`${url}${word}`)
		.then(response => {
			if (!response.ok) {
				NotFound.style.display = 'flex'
				ResultBlock.style.display = 'none'
			} else {
				NotFound.style.display = 'none'
				ResultBlock.style.display = 'block'
			}

			return response.json()
		})
		.then(data => {
			const currentWrd = document.getElementById('word-id')
			const volume = document.querySelector('.fas')
			const meaning = document.querySelector('.word-meaning')
			const example = document.querySelector('.word-example')
			const pos = document.getElementById('pos')
			const sample = document.getElementById('sample')

			console.log(data)

			if (currentWrd && volume && meaning && example) {
				currentWrd.textContent = `${data[0].word}`

				// Sound
				const phonetics = data[0].phonetics
				const audioObj = phonetics.find(p => p.audio)

				if (audioObj) {
					sound.src = audioObj.audio
				}

				volume.addEventListener('click', () => {
					sound.play()
				})

				const meanings = data[0].meanings

				if (meanings && meanings.length > 1) {
					partOfSpeechText = meanings[1].partOfSpeech
				}

				pos.textContent = `${partOfSpeechText}`
				sample.textContent = `${data[0].phonetics[0].text}`

				meaning.textContent = `${data[0].meanings[0].definitions[0].definition}`
				example.textContent = `${
					data[0].meanings[0].definitions[0].example || ''
				}`
			}
		})
}

SearchBtn.addEventListener('click', () => {
	fetchDict()
})

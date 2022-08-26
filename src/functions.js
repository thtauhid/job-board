export const generateKeywords = (str) => {
	str = str.toUpperCase()
	str = stripString(str)
	let keywordsArray = str.split(" ")
	return removeDuplicateItems(keywordsArray)
}

const stripString = (str) => {
	str = str.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ")
	return str
}

const removeDuplicateItems = (arr) => {
	return arr.filter((item, index) => arr.indexOf(item) === index)
}

export const subscribeToNewsletter = (email) => {
	return new Promise((resolve, reject) => {
		// Write the logic to add to the newsletter list

		// Return true if successfully added to list
		return resolve(true)

		// Return false if unable to add to the list
		//reject(false)
	})
}

export const createCombinedId = (...emails) => {

    const unique = emails.sort((a, b) => (a < b ? -1 : 1))

    const combinedId = `${unique[0]}--with--${unique[1]}`

    // localStorage.setItem('combinedId',combinedId)
    return combinedId
}


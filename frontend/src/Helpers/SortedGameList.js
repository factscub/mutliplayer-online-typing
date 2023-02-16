export const sortedGameList=(data)=>{
    return [...data].sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

}
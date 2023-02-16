import { words } from "../Constants/Words";
export const getWords = words.split(' ').join(' @@').split('@@').slice(0,1)
//  console.log(getWords)


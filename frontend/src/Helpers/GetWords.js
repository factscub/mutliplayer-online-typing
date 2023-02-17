import { words } from "../Constants/Words";
export const getWords = words.split(' ').join(' @@').split('@@')
//  console.log(getWords)


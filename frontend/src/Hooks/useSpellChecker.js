import { useCallback, useEffect, useMemo, useState } from 'react';
import { getWords } from '../Helpers';

const useSpellChecker = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [error, setError] = useState(false);
    const [finished, setFinished] = useState(false);
    const [errors, setErrors] = useState(0);

    const words = useMemo(() => getWords, []);

    const spellChecker = useCallback(({ e, intrId }) => {
        const typedWord = e.target.value;
        const currentWord = words[wordIndex];

        if (!typedWord) {
            setError(false);
            setLetterIndex(0);
            return;
        }

        if (currentWord.startsWith(typedWord) && typedWord) {
            setError(false);
            setLetterIndex(typedWord.length);
            if (wordIndex === words.length - 1 && currentWord === typedWord) {
                clearInterval(intrId)
                e.target.value = '';
                setFinished(true);
                return;
            }
            if (currentWord === typedWord) {
                setLetterIndex(0);
                e.target.value = '';
                setWordIndex(prev => prev + 1);
                return;
            }

        }
        else {
            setError(true);
        }

    }, [wordIndex]);

    useEffect(() => {
        if (error) {
            setErrors(prev => prev + 1);
        }
    }, [error]);


    return { errors, words, wordIndex, letterIndex, error, finished, spellChecker };
}

export default useSpellChecker;
import { useCallback, useEffect, useState } from 'react'
import { timeFormatter } from '../Helpers';

const useSetInterval = () => {
    const [intrId, setIntrId] = useState();
    const [elapsedTime, setElapsedTime] = useState('00:00');
    const [timeCount, setTimecount] = useState(0);
    const timer = useCallback(timeFormatter, []);

    useEffect(() => {
        let time = 0
        function inf() {
            const id = this.setInterval(() => {
                time++
                timer(time)
                setTimecount(time);
                setElapsedTime(timer(time)
                );
            }, 1000);
            setIntrId(id);
        }
        if (!intrId) {
            window.addEventListener('keypress', inf);
        }

        return () => {
            clearInterval(intrId);
            window.removeEventListener('keypress', inf);
        }

    }, [intrId, timer]);

    return { elapsedTime, timeCount, intrId };
}

export default useSetInterval;
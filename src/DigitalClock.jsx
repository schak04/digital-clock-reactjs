import { useState, useEffect } from 'react';

export default function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(()=>{
        const intervalID = setInterval(()=>{
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalID);
        }
    }, [])

    function padWithZeroes(num) {
        if (num<10) return `0${num}`;
        else return num;
    }

    function getTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours>12? "PM":"AM" ;
        hours = hours  % 12 || 12;
        return `${padWithZeroes(hours)}:${padWithZeroes(minutes)}:${padWithZeroes(seconds)} ${meridiem}`
    }

    return (
        <div className="clock-container">
            <p className="clock">{getTime()}</p>
        </div>
    );
}
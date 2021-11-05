import React, { useState, useEffect } from 'react'

function CountDownTimer({ duration, counter }) {
    const [time, setTime] = useState(duration)
    // console.log(time)
    // console.log(time.hrs)
    const tick = () => {
        if (time.hrs === 0 && time.mins === 0 && time.secs === 0) {
            console.log("HELLO")
        }
        else if (time.mins === 0 && time.secs === 0)
            setTime({
                hrs: time.hrs - 1,
                mins: 59,
                secs: 59
            })
        else if (time.secs === 0) {
            setTime({
                ...time,
                mins: time.mins - 1,
                secs: 59
            })
        } else {
            setTime({
                ...time,
                secs: time.secs - 1
            })
        }
    }

    useEffect(() => {
        const timerId = setInterval(() =>  {
            tick()
            counter()
        }, 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div style={{display:'flex', justifyContent: 'center'}}>
            <p>{time.hrs}:{time.mins}:{time.secs}</p>
        </div>
    )
}

export default CountDownTimer
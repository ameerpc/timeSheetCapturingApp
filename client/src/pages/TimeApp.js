import { useState, useEffect } from 'react'
import AuthForm from './comps/AuthForm'
import UserData from './comps/UserData'
import styles from './timeapp.module.css'

const TimeApp = () => {
    const [loged, setLoged] = useState(false)

    useEffect(() => {
        fetch('/checkToken')
            .then((res) => {
                if(res.status === 200) setLoged(true) // set user loged in
                else setLoged(false)
            })
            .catch((err) => {
                console.log('token not exiswts')
            })
    }, [])

    return (
        <>
            <div className={styles.container}>
               {loged?<UserData logoutCallBack={setLoged} />:<AuthForm parentCallBack={setLoged} />}
            </div>
        </>
    )
}

export default TimeApp
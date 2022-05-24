import { useEffect, useState } from 'react'
import styles from './projectbar.module.css'

const ProjectTab = (props) => {
    const [users, setUsers] = useState([{}])
    const [user, setUser] = useState('')
    const [members, setMembers] = useState('')

    useEffect(() => {
        fetch('/api/users/getall')
        .then(res => res.json())
        .then(data => setUsers(JSON.parse(data)))
    },[])
    useEffect(() => {
        fetch(`/api/project/${props.projectId}/getMembers`)
        .then(res => res.text())
        .then(data => console.log(data))
    },[])

    const handleAddMemeber = (event) => {
        event.preventDefault()
        fetch(`/api/project/${props.projectId}/addMember/${user}`)
        .then(res => res.text())
        .then(res => console.log(res))
    }

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.container}>
                    <div className={styles.flex_col + ' ' + styles.project_second_cont}>
                        <h3>{props.projectName}</h3>
                        <h5>{props.projectDescription}</h5>
                    </div>
                    <div className={styles.flex_col + ' ' + styles.project_second_cont}>
                        <div className={styles.flex_col}>
                            <div className={styles.timeBar} />
                        </div>
                        <div className={styles.button_cont}>
                            <button>Analize</button>
                            <div>
                                <select value={user} onChange={(e) => setUser(e.target.value)}>
                                    {users.map((item, index) => <option key={index} value={item.username}>{item.username}</option>)}
                                </select>
                                <button onClick={handleAddMemeber}>Add Members</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.project_action}>
                    
                </div>
            </div>
        </>
    )
}

export default ProjectTab
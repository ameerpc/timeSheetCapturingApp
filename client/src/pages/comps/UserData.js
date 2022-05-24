import { useState, useEffect } from 'react'
import ProjectBar from './ProjectBar'
import ProjectTab from './ProjectTab'
import DatalistInput from 'react-datalist-input'
import styles from './userdata.module.css'

const UserData = (props) => {
    const [users, setUsers] = useState([{}])
    const [username, setUsername] = useState('')
    const [projects, setProjects] = useState([{}])
    const [project, setProject] = useState('')
    const [tasks, setTasks] = useState([''])
    const [newtask, setNewtask] = useState('')
    const [popup, setPopup] = useState(false)
    const [projOrTask, setProjOrTask] = useState(true) // show projects or tasks - default true-> Show Project
    
 
    useEffect(() => {
        fetch('/api/secret')
        .then(res => res.text())
        .then(res => setUsername(res))
    },[])

    useEffect(() => {
        fetch('/api/projects/get_all')
        .then(res => res.json())
        .then(data => setProjects(JSON.parse(data)))
    },[])

    const handleSignOut = (event) => {
        event.preventDefault()
        fetch('/api/logout')
        .then(res => {
            if(res.status === 200) {
                props.logoutCallBack(false)
            }
        }).catch(err => console.log(err))
    }

    const insertProject = (projectData) => {
        fetch('/api/projects/add', {
            method: 'POST',
            body: JSON.stringify(projectData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setProjects((previousValue) => [ ...previousValue, projectData])
            console.log(projects)
        })
        .catch(err => console.log(err)) //Display error message
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.top_container}>
                    <div  className={styles.project_nav}>
                        <button onClick={() => setPopup(true)}>Create Project</button>
                    </div>
                    <div>
                        <span style={{marginRight:'9px'}}>{`Hello ${username}`}</span>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
                <div className={styles.bottom_container}>
                    {popup?<ProjectTab callBack={setPopup} projectDataCallBack={insertProject} />:<></>}
                    


                    {projects.map((item, index) => <ProjectBar key={index} projectName={item.projectName} projectDescription={item.projectDescription} projectId={item._id} />)}
                    
                </div>
            </div>
        </>
    )
}

export default UserData
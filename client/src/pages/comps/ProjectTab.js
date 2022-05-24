import { useState } from 'react'
import styles from './projecttab.module.css'

const ProjectTab = (props) => {
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [owner, setOwner] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date()) 

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const projectTemplate = {
            projectName: projectName,
            projectDescription: projectDescription,
            owner: owner,
            startDate: startDate,
            endDate: endDate
        }
        props.projectDataCallBack(projectTemplate) // Form Data Submitted to UserData.js
        document.getElementById('popup_form').style.display = 'none'
    }

    return (
        <>
            <div className={styles.container} id='popup_form'>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:"5px 20px"}}>
                    <h1 className={styles.heading}>New Project</h1>
                    <span className={styles.close} onClick={(e) => {document.getElementById('popup_form').style.display = 'none';props.callBack(false)}}>&times;</span>  
                </div>
                <form className={styles.form_container} onSubmit={handleFormSubmit}>
                <div className={styles.form_input}>
                        <label htmlFor='project-name'>Project Name</label>
                        <input type='text' id='project-name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor='project-description'>Project description</label>
                        <input type='text' id='project-description' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor="project-owner">Project Owner</label>
                        <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className={styles.form_input}>
                        <label htmlFor='date-start'>Starting Date: </label>
                        <input type='date' id='date-start' value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <label htmlFor='date-end' style={{marginLeft:"16px"}}>Ending Date: </label>
                        <input type='date' id='date-end' value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>

                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                        <input className={styles.input_reset} type='reset' value='Reset' />
                        <input className={styles.input_submit} type='submit' value='Create' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProjectTab
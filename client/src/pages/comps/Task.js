import taskStyles from './task.module.css'

const ProjectTab = (props) => {
    return (
        <>
            <div className={styles.container} onClick=''>
                <div className={styles.flex_col + ' ' + styles.project_second_cont}>
                    <h3>{props.projectName}</h3>
                    <h5>{props.projectDescription}</h5>
                </div>
                <div className={styles.flex_col + ' ' + styles.project_second_cont}>
                    <div className={styles.flex_col}>
                        <div className={styles.timeBar} />
                    </div>
                    <div className={styles.button_cont}>
                        <button>Add Tasks</button>
                        <button>Add Members</button>
                        <button>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectTab
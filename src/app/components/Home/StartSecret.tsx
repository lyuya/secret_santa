import styles from "./startSecret.module.css"
export default function StartSecret() {
    return (<>
        <div className={styles.homeContainer}>
            <div className="flex justify-center align-middle self-center h-full">
                <button className="self-center rounded-full bg-red-800 text-white font-bold p-5">Let's make a secret !</button>
            </div>
        </div>        
    </>)
}
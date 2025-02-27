export default function Alpha(props){
    return(
        <button onClick={props.click} className={props.myclass} disabled = {props.disabled} aria-disabled={props.disabled} aria-label={props.label}>
            {props.letters}
        </button>
    )
}
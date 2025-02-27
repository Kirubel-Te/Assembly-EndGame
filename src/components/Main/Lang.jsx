export default function Lang(props){
    const style = {
        backgroundColor:props.bgcolor,
        color:props.color
    }
    return(
        <> 
            <span style={style} className={props.className}>
                <h5>{props.name}</h5>
            </span>

            
        </> 
    )
       
}
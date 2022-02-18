import { useSelector, useDispatch } from "react-redux"
export default function Message(){
    const message = useSelector(state => state.message)
    const dispacth = useDispatch()
    if(!message){
        return null
    }
    return(
        <div style={{zIndex:9999}} className="modal bd-example-modal-lg d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                <div className="modal-content height-30vh">
                    <div className="modal-body">
                        <div className="pb-4 d-flex flex-row-reverse">
                            <button type="button" className="close" onClick={()=>{dispacth({type: 'HIDE-MESSAGE'})}}><span  aria-hidden="true">×</span></button>
                        </div>
                        <div className="text-center pt-5">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
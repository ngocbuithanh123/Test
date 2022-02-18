import { useSelector } from 'react-redux'
export default function Loader(){
    const isLoading = useSelector(state => state.isLoading)
    if(!isLoading){
        return null
    } else {
        return(
            <div className="loader-container">
                <div className="loader">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                </div>
            </div>
        )
    }
}
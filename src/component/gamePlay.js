import { useLocation, useHistory } from 'react-router-dom'
// import { defaultAPI } from './helper/helper'
export default function GamePlay(){
    const location = useLocation()
    const history = useHistory()
    let state = location.state
    if(!state) {
        history.push('/game-lobby')
    }
    let src = "/game/" + state + '/index.html'
    return(
        <div className="main-container">
            <div className="container-fluid" style={{height: "100%"}}>
                <iframe className="iframe-game" title="game" width="100%" height="100%" src={src}></iframe>
            </div>
        </div>
    )
}
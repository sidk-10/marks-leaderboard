import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'
import "bootstrap/dist/css/bootstrap.min.css"


// styles
const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
    // background: '#000',
    height: "100vh"
}

// markup
const IndexPage = () => {
    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles} className="text-muted bg-light">
            <title>Home</title>
            <h1 className="text-secondary">HOME</h1>
            <div style={{width: "75px"}}>
            <ul class="nav flex-column nav-pills nav-fill" style={{marginTop: 20}}>
                <li class="nav-item mt-2">
                    <a class="nav-link active" aria-current="page" href="/marks">Marks</a>
                </li>
                <li class="nav-item mt-2">
                    <a class="nav-link active" href="/leaderboard">Leaderboard</a>
                </li>
            </ul>
            </div>
        </main>
    )
}

export default IndexPage

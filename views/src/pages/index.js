import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'

// styles
const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

// markup
const IndexPage = () => {
    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles}>
            <title>Home</title>
            <h1>HOME</h1>
            <Grid container direction="column">
                <Grid item>
                    <Link to="/marks">
                        Enter Marks
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/leaderboard">
                        View Leaderboard
                    </Link>
                </Grid>
            </Grid>
        </main>
    )
}

export default IndexPage

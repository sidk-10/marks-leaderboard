import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// styles
const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const marksForm = {

}
const marksFormRow = {
    margin: "0.5rem 0"
}
const navigation = {
    marginTop: "1rem"
}
const navigationTab = {
    marginRight: "1rem" 
}

// markup
const MarksPage = () => {
    const [total, setTotal] = React.useState(0)
    const [lastUpdate, setLastUpdate] = React.useState({
        "physics" : 0,
        "chemistry" : 0,
        "mathematics" : 0,
    })

    React.useEffect(() => {
        document.getElementById("total").value = total
        document.getElementById("percentage").value = (total / 3).toPrecision(3)
    }, [total])
    const addMarks = (event) => {
        console.log(event.target.value)
        setTotal(total - lastUpdate[event.target.id] + parseInt(event.target.value))
        setLastUpdate({
            ...lastUpdate,
            [event.target.id] : parseInt(event.target.value)
        })
    }

    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles}>
            <title>Enter Marks</title>
            <h1>ENTER MARKS</h1>
            <form noValidate autoComplete="off">
                <Grid container direction="column" styles={marksForm}>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="rollNo" label="Roll No" variant="outlined" /></Grid>
                        <Grid item><TextField id="name" label="Name" variant="outlined" /></Grid>
                    </Grid>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="physics" label="Physics Marks" defaultValue={0} variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField id="chemistry" label="Chemistry Marks" defaultValue={0} variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField id="mathematics" label="Maths Marks" defaultValue={0} variant="outlined" onChange={addMarks} /></Grid>
                    </Grid>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="total" label="Total" defaultValue={total} variant="outlined" disabled={true} /></Grid>
                        <Grid item><TextField id="percentage" label="Percentage" defaultValue={(total / 300).toPrecision(2)} variant="outlined" disabled={true} /></Grid>
                    </Grid>
                    <Grid container>
                    <Button variant="contained" color="primary" disableElevation>
                        SUBMIT
                    </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container style={navigation}>
                <Grid item style={navigationTab}>
                    <Link to="/">
                        Home
                    </Link>
                </Grid>
                <Grid item style={navigationTab}>
                    <Link to="/leaderboard">
                        Leaderboard
                    </Link>
                </Grid>
            </Grid>
        </main>
    )
}

export default MarksPage

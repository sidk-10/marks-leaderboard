import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import $ from 'jquery'
// import config from "../config.json"

const config = {
    "base_url": "https://marks-leaderboard.herokuapp.com/"
}
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
        // console.log(event.target.value)
        let val = event.target.value
        if(parseInt(val) > 100) {
            alert("Enter marks out of 100!") 
            event.target.value = 0
            return
        }
        if (val == "") val = 0 
        setTotal(total - lastUpdate[event.target.id] + parseInt(val))
        setLastUpdate({
            ...lastUpdate,
            [event.target.id] : parseInt(val)
        })
    }
    const enterMarks = (event) => {
        event.target.innerHTML = "Loading..."
        let details = document.getElementById("studentDetails")
        let url = config["base_url"] + "api/enter_marks"
        let data = {
            roll_no: parseInt(details["rollNo"].value),
            student_name: details["studentName"].value,
            physics: parseInt(details["physics"].value),
            chemistry: parseInt(details["chemistry"].value),
            maths: parseInt(details["maths"].value)
        }
        console.log(data)
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: (response) => {
                
                if(window != undefined) {
                    window.location.reload()
                }
                if(response["status"] != "failed") alert("Marks successfully entered!" + "\nCheckout Leaderboard!")
                else {
                    alert("Roll No. already exists!")
                }
                // console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }

    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles}>
            <title>Enter Marks</title>
            <h1>ENTER MARKS</h1>
            <form noValidate id="studentDetails" autoComplete="off">
                <Grid container direction="column" styles={marksForm}>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField type="number" id="rollNo" label="Roll No" name="rollNo" variant="outlined" /></Grid>
                        <Grid item><TextField id="name" label="Name" name="studentName" variant="outlined" /></Grid>
                    </Grid>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField type="number" id="physics" label="Physics Marks" name="physics" variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField type="number" id="chemistry" label="Chemistry Marks" name="chemistry" variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField type="number" id="mathematics" label="Maths Marks" name="maths" variant="outlined" onChange={addMarks} /></Grid>
                    </Grid>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="total" label="Total" name="total" defaultValue={total} variant="outlined" disabled={true} /></Grid>
                        <Grid item><TextField id="percentage" label="Percentage" name="percentage" defaultValue={(total / 300).toPrecision(2)} variant="outlined" disabled={true} /></Grid>
                    </Grid>
                    <Grid container>
                    <Button variant="contained" color="primary" disableElevation onClick={enterMarks}>
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

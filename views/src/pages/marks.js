import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import $ from 'jquery'
import config from "../config.json"

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
    const enterMarks = () => {
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
                console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }
    // async function enterMarks() {
    //     console.log("clicked")
        // let url = config["base_url"] + "api/enter_marks"
        // let details = document.getElementById("studentDetails")
    //     let data = {
            // "roll_no": parseInt(details["rollNo"].value),
            // "student_name": details["studentName"].value,
            // "physics": parseInt(details["physics"].value),
            // "chemistry": parseInt(details["chemistry"].value),
            // "maths": parseInt(details["maths"].value)
    //     }
    //     console.log(data)
        
    //     // alert("Request completed", response.json()["student_name"])
    //     console.log(response)
    //     // return response.json()    
    // }

    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles}>
            <title>Enter Marks</title>
            <h1>ENTER MARKS</h1>
            <form noValidate id="studentDetails" autoComplete="off">
                <Grid container direction="column" styles={marksForm}>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="rollNo" label="Roll No" name="rollNo" variant="outlined" /></Grid>
                        <Grid item><TextField id="name" label="Name" name="studentName" variant="outlined" /></Grid>
                    </Grid>
                    <Grid container style={marksFormRow}>
                        <Grid item><TextField id="physics" label="Physics Marks" name="physics" variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField id="chemistry" label="Chemistry Marks" name="chemistry" variant="outlined" onChange={addMarks} /></Grid>
                        <Grid item><TextField id="mathematics" label="Maths Marks" name="maths" variant="outlined" onChange={addMarks} /></Grid>
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

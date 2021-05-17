import * as React from "react"
import Link from 'gatsby-link'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.min.css"

import CircularProgress from '@material-ui/core/CircularProgress';
// import config from "../config.json"

const config = {
    "base_url": "https://marks-leaderboard.herokuapp.com/"
}
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    { id: 'roll_no', numeric: true, disablePadding: true, label: 'Roll No.' },
    { id: 'student_name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'physics', numeric: true, disablePadding: false, label: 'Physics' },
    { id: 'chemistry', numeric: true, disablePadding: false, label: 'Chemistry' },
    { id: 'maths', numeric: true, disablePadding: false, label: 'Mathematics' },
    { id: 'total', numeric: true, disablePadding: false, label: "Total"},
    { id: 'percent', numeric: true, disablePadding: false, label: "%"},
]

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={"center"}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                        {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                        </span>
                    ) : null}
                    </TableSortLabel>
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function EnhancedTable({rows}) {
    // const classes = React.useStyles()
    const classes = {}
    const [order, setOrder] = React.useState('desc')
    const [orderBy, setOrderBy] = React.useState('percent')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name)
        setSelected(newSelecteds)
        return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        )
        }

        setSelected(newSelected)
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
        <div className={"shadow rounded " + classes.root}>
        <Paper className={classes.paper} elevation={0} square={false}>
        {rows.length <= 1 ? (<div style={{textAlign: "center", padding: 15}}><CircularProgress  color="primary" /> </div>): null}
                    
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            {rows.length > 1 ? ( <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                />
                <TableBody>
                    
                {stableSort(rows, getComparator(order, orderBy))
                    .map((row, index) => {

                    return (
                        <TableRow
                        hover
                        >
                        <TableCell align="center">{row.roll_no}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.physics}</TableCell>
                        <TableCell align="center">{row.chemistry}</TableCell>
                        <TableCell align="center">{row.maths}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                        <TableCell align="center">{row.percent}</TableCell>
                        </TableRow>
                    )
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>) : null}
           
        </Paper>
        </div>
    )
}


// styles
const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
    height: "100vh"
}
const navigation = {
    marginTop: "1rem"
}
const navigationTab = {
    marginRight: "1rem" 
}

// markup
const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = React.useState([{
        "roll_no": 0,
        "student_name": "",
        "physics": 0,
        "chemistry": 0,
        "maths": 0,
        "total": 0,
        "percent": 0
    }])
    React.useEffect(() => {
        let url = config["base_url"] + 'api/leaderboard'
        $.ajax({
            url: url,
            method: "GET",
            success: (response) => {
                console.log(response, response.length)
                for(let i = 0; i < response.length; i++) {
                    response[i]["total"] = response[i]["physics"] + response[i]["chemistry"] + response[i]["maths"]
                    response[i]["percent"] = (response[i]["total"] / 3).toFixed(2)
                }
                setLeaderboardData(response)
                // setLoaded(false)
                // console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }, [])
    const preventDefault = (event) => event.preventDefault()
    return (
        <main style={pageStyles} className="bg-light">
            <title>Leaderboard</title>
            <h1 className="text-muted">LEADERBOARD</h1>
            <EnhancedTable rows={leaderboardData} />
            <ul class="nav nav-pills nav-fill" style={{marginTop: 20}}>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/marks">Marks</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/leaderboard">Leaderboard</a>
                </li>
            </ul>
        </main>
    )
}

export default LeaderboardPage

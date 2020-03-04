import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default (props) => {
    // const {id} = props;
    const [teams, setTeams] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/team/')
        .then(response => {
            setTeams(response.data);
            // console.log(response.data);
            setLoaded(true)
        })
    },[])

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
        bold: {
            fontWeight: "bold"
        },
        backgroundgray: {
            backgroundColor: "gray"
        },
        fontWhite: {
            fontWeight: "bold",
            color: "white"
        }
      });

    const classes = useStyles();


    return(
        <div>
            <h1>MLB Detail</h1>
            {/* {loaded && 
            <h2>{team.city} {team.nickname}</h2>
            } */}
            <h3>Offensive Statistics</h3>
            {loaded && <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead >
                    <TableRow className={classes.backgroundgray}>
                        <TableCell className={classes.fontWhite} align="right">Team</TableCell>
                        <TableCell className={classes.fontWhite} align="right">Games</TableCell>
                        <TableCell className={classes.fontWhite} align="right">PA</TableCell>
                        <TableCell className={classes.fontWhite} align="right">AB</TableCell>
                        <TableCell className={classes.fontWhite} align="right">R</TableCell>
                        <TableCell className={classes.fontWhite} align="right">HR</TableCell>
                        <TableCell className={classes.fontWhite} align="right">HR%</TableCell>
                        <TableCell className={classes.fontWhite} align="right">BB</TableCell>
                        <TableCell className={classes.fontWhite} align="right">BB%</TableCell>
                        <TableCell className={classes.fontWhite} align="right">SO</TableCell>
                        <TableCell className={classes.fontWhite} align="right">SO%</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {loaded && teams.sort((a,b) => (a.nickname > b.nickname) ? 1 : -1).map((team, index) => 
                    <TableRow key={index}>
                        <TableCell className={classes.bold} align="right">{team.nickname}</TableCell>
                        <TableCell align="right">{team.games}</TableCell>
                        <TableCell align="right">{team.offense.plate_appearances}</TableCell>
                        <TableCell align="right">{team.offense.at_bats}</TableCell>
                        <TableCell align="right">{team.offense.runs_scored}</TableCell>
                        <TableCell align="right">{team.offense.homeruns}</TableCell>
                        <TableCell align="right">{(team.offense.homeruns/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                        <TableCell align="right">{team.offense.walks}</TableCell>
                        <TableCell align="right">{(team.offense.walks/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                        <TableCell align="right">{team.offense.strikeouts}</TableCell>
                        <TableCell align="right">{(team.offense.strikeouts/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                    </TableRow>
                    )
                    }
                    </TableBody>
                </Table>
                </TableContainer>
            }
            <h3>Defensive / Pitching Statistics</h3>
            {loaded && <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead> 
                    <TableRow className={classes.backgroundgray}>
                        <TableCell className={classes.fontWhite} align="right">Team</TableCell>
                        <TableCell className={classes.fontWhite} align="right">IP</TableCell>
                        <TableCell className={classes.fontWhite} align="right">H</TableCell>
                        <TableCell className={classes.fontWhite} align="right">R</TableCell>
                        <TableCell className={classes.fontWhite} align="right">R/G</TableCell>
                        <TableCell className={classes.fontWhite} align="right">SO</TableCell>
                        <TableCell className={classes.fontWhite} align="right">SO/9</TableCell>
                        <TableCell className={classes.fontWhite} align="right">Def. Eff.</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {loaded && teams.sort((a,b) => (a.nickname > b.nickname) ? 1 : -1).map((team, index) => 
                    <TableRow key={index}>
                        <TableCell className={classes.bold} align="right">{team.nickname}</TableCell>
                        <TableCell align="right">{team.defense.innings_pitched}</TableCell>
                        <TableCell align="right">{team.defense.hits_allowed}</TableCell>
                        <TableCell align="right">{team.defense.runs_allowed}</TableCell>
                        <TableCell align="right">{(team.defense.runs_allowed/team.games).toFixed(2)}</TableCell>
                        <TableCell align="right">{team.defense.strikeouts_pitched}</TableCell>
                        <TableCell align="right">{(team.defense.strikeouts_pitched/team.defense.innings_pitched*9).toFixed(2)}</TableCell>
                        <TableCell align="right">{team.defense.defensive_efficiency.toFixed(3)}</TableCell>
                    </TableRow>
                    )
                    }
                    </TableBody>
                </Table>
                </TableContainer>
            }   
        </div>
    )
}
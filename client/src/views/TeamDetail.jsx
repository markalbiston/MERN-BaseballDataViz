import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BattingPieChart from '../components/BattingPieChart';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default (props) => {
    const {id, leagueAvgId} = props;
    const [team, setTeam] = useState();
    const [loaded, setLoaded] = useState(false);
    const [teamAvg, setTeamAvg] = useState();

    console.log(leagueAvgId);
    useEffect(() => {
        axios.get('http://localhost:8000/api/team/' + id)
        .then(response => {
            setTeam(response.data);
            // console.log(response.data);
            setLoaded(true)
        })
    },[id])

    useEffect(() => {
        console.log(leagueAvgId);
        axios.get('http://localhost:8000/api/team/' + leagueAvgId)
        .then(response => {
            setTeamAvg(response.data);

        })
    },[leagueAvgId])

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
        bold: {
            fontWeight: "bold",
        }
      });

    const classes = useStyles();


    return(
        <div>
            {loaded && 
            <div style={{ backgroundImage: `url(${team.avatar})`, backgroundSize: "contain", backgroundRepeat: "repeat-y", }}>
            <h1>Team Detail</h1>
             
            <h2>{team.city} {team.nickname}</h2>
            
            </div>}
            <h4>Offensive Statistics</h4>
            {loaded && <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.bold} align="right">Games</TableCell>
                        <TableCell className={classes.bold} align="right">PA</TableCell>
                        <TableCell className={classes.bold} align="right">AB</TableCell>
                        <TableCell className={classes.bold} align="right">R</TableCell>
                        <TableCell className={classes.bold} align="right">R/G</TableCell>
                        <TableCell className={classes.bold} align="right">HR</TableCell>
                        <TableCell className={classes.bold} align="right">HR%</TableCell>
                        <TableCell className={classes.bold} align="right">BB</TableCell>
                        <TableCell className={classes.bold} align="right">BB%</TableCell>
                        <TableCell className={classes.bold} align="right">SO</TableCell>
                        <TableCell className={classes.bold} align="right">SO%</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell align="right">{team.games}</TableCell>
                        <TableCell align="right">{team.offense.plate_appearances}</TableCell>
                        <TableCell align="right">{team.offense.at_bats}</TableCell>
                        <TableCell align="right">{team.offense.runs_scored}</TableCell>
                        <TableCell align="right">{(team.offense.runs_scored/team.games).toFixed(2)}</TableCell>
                        <TableCell align="right">{team.offense.homeruns}</TableCell>
                        <TableCell align="right">{(team.offense.homeruns/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                        <TableCell align="right">{team.offense.walks}</TableCell>
                        <TableCell align="right">{(team.offense.walks/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                        <TableCell align="right">{team.offense.strikeouts}</TableCell>
                        <TableCell align="right">{(team.offense.strikeouts/team.offense.plate_appearances*100).toFixed(2)}%</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            }   
            <h4>Defensive / Pitching Statistics</h4>
            {loaded && <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.bold} align="right">IP</TableCell>
                        <TableCell className={classes.bold} align="right">H</TableCell>
                        <TableCell className={classes.bold} align="right">R</TableCell>
                        <TableCell className={classes.bold} align="right">R/G</TableCell>
                        <TableCell className={classes.bold} align="right">SO</TableCell>
                        <TableCell className={classes.bold} align="right">SO/9</TableCell>
                        <TableCell className={classes.bold} align="right">Def. Eff.</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell align="right">{team.defense.innings_pitched}</TableCell>
                        <TableCell align="right">{team.defense.hits_allowed}</TableCell>
                        <TableCell align="right">{team.defense.runs_allowed}</TableCell>
                        <TableCell align="right">{(team.defense.runs_allowed/team.games).toFixed(2)}</TableCell>
                        <TableCell align="right">{team.defense.strikeouts_pitched}</TableCell>
                        <TableCell align="right">{(team.defense.strikeouts_pitched/team.defense.innings_pitched*9).toFixed(2)}</TableCell>
                        <TableCell align="right">{team.defense.defensive_efficiency}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            }   
            <Paper>
                <div style={{display:'inline-block', width: '45%'}}>
                    <h4>Team Offensive Statistics</h4>
                    <BattingPieChart id={id} team={team} setTeam={setTeam}/>
                </div>
                <div style={{display:'inline-block', width: '45%'}}>
                    <h4>League Average Offensive Statistics</h4>
                    <BattingPieChart id={leagueAvgId} team={teamAvg} setTeam={setTeamAvg}/>
                </div>
            </Paper>
            
        </div>
    )
}

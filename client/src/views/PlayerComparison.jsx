import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import WarGraph from '../components/WarGraph';

export default () => {
    const [idPlayerOne, setIdPlayerOne] = useState();
    const [idPlayerTwo, setIdPlayerTwo] = useState();
    const [allPlayers, setAllPlayers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/player/')
        .then(response => {
            setAllPlayers(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const handleChangePlayer1 = (e) => {
        setIdPlayerOne(e.target.value);
    }
    const handleChangePlayer2 = (e) => {
        setIdPlayerTwo(e.target.value);
    }
    
    const useStyles = makeStyles(theme => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    return(
        <div>
            <h1>Individual Player Career WAR Comparison</h1>
            <h3>WAR = Wins Above Replacement</h3>
            <h5>A single number that presents the number of wins the player added to the team above what a replacement player would add.</h5>
            <FormControl className={classes.formControl}>
                <InputLabel id="">Player 1</InputLabel>
                <Select
                onChange={handleChangePlayer1}
                >
                {allPlayers.sort((a,b) => (a.name > b.name) ? 1 : -1).map((player, index) => {
                    return <MenuItem key={index} value={player._id}>{player.name}</MenuItem>
                })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="">Player 2</InputLabel>
                <Select
                onChange={handleChangePlayer2}
                >
                {allPlayers.sort((a,b) => (a.name > b.name) ? 1 : -1).map((player, index) => {
                    return <MenuItem key={index} value={player._id}>{player.name}</MenuItem>
                })}
                </Select>
            </FormControl>
            <WarGraph idPlayerOne={idPlayerOne} idPlayerTwo={idPlayerTwo}/>

        </div>
    )
}
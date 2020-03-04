import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from 'recharts';

export default (props) => {
    const {idPlayerOne, idPlayerTwo} = props;
    const [playerOne, setPlayerOne] = useState();
    const [playerTwo, setPlayerTwo] = useState();


    useEffect(() => {
        axios.get('http://localhost:8000/api/player/'+idPlayerOne)
        .then(response => {
            setPlayerOne(response.data)
        })
    },[idPlayerOne])
    useEffect(() => {
        axios.get('http://localhost:8000/api/player/'+idPlayerTwo)
        .then(response => {
            setPlayerTwo(response.data)
        })
    },[idPlayerTwo])

    let data =[];

    if(playerOne && playerTwo){
        data = [
            {
                name: 'Season 1', Player1: `${playerOne.cumWar.season01}`, Player2: `${playerTwo.cumWar.season01}`
            },
            {
                name: 'Season 2', Player1: `${playerOne.cumWar.season02}`, Player2: `${playerTwo.cumWar.season02}`
            },
            {
                name: 'Season 3', Player1: `${playerOne.cumWar.season03}`, Player2: `${playerTwo.cumWar.season03}`
            },
            {
                name: 'Season 4', Player1: `${playerOne.cumWar.season04}`, Player2: `${playerTwo.cumWar.season04}`
            },
            {
                name: 'Season 5', Player1: `${playerOne.cumWar.season05}`, Player2: `${playerTwo.cumWar.season05}`
            },
            {
                name: 'Season 6', Player1: `${playerOne.cumWar.season06}`, Player2: `${playerTwo.cumWar.season06}`
            },
            {
                name: 'Season 7', Player1: `${playerOne.cumWar.season07}`, Player2: `${playerTwo.cumWar.season07}`
            },
            {
                name: 'Season 8', Player1: `${playerOne.cumWar.season08}`, Player2: `${playerTwo.cumWar.season08}`
            },
            {
                name: 'Season 9', Player1: `${playerOne.cumWar.season09}`, Player2: `${playerTwo.cumWar.season09}`
            },
            {
                name: 'Season 10', Player1: `${playerOne.cumWar.season10}`, Player2: `${playerTwo.cumWar.season10}`
            },
            {
                name: 'Season 11', Player1: `${playerOne.cumWar.season11}`, Player2: `${playerTwo.cumWar.season11}`
            },
            {
                name: 'Season 12', Player1: `${playerOne.cumWar.season12}`, Player2: `${playerTwo.cumWar.season12}`
            },
            {
                name: 'Season 13', Player1: `${playerOne.cumWar.season13}`, Player2: `${playerTwo.cumWar.season13}`
            },
            {
                name: 'Season 14', Player1: `${playerOne.cumWar.season14}`, Player2: `${playerTwo.cumWar.season14}`
            },
            {
                name: 'Season 15', Player1: `${playerOne.cumWar.season15}`, Player2: `${playerTwo.cumWar.season15}`
            },
            {
                name: 'Season 16', Player1: `${playerOne.cumWar.season16}`, Player2: `${playerTwo.cumWar.season16}`
            },
            {
                name: 'Season 17', Player1: `${playerOne.cumWar.season17}`, Player2: `${playerTwo.cumWar.season17}`
            },
            {
                name: 'Season 18', Player1: `${playerOne.cumWar.season18}`, Player2: `${playerTwo.cumWar.season18}`
            },
            {
                name: 'Season 19', Player1: `${playerOne.cumWar.season19}`, Player2: `${playerTwo.cumWar.season19}`
            },
            {
                name: 'Season 20', Player1: `${playerOne.cumWar.season20}`, Player2: `${playerTwo.cumWar.season20}`
            },
            {
                name: 'Season 21', Player1: `${playerOne.cumWar.season21}`, Player2: `${playerTwo.cumWar.season21}`
            },
            {
                name: 'Season 22', Player1: `${playerOne.cumWar.season22}`, Player2: `${playerTwo.cumWar.season22}`
            },
            {
                name: 'Season 23', Player1: `${playerOne.cumWar.season23}`, Player2: `${playerTwo.cumWar.season23}`
            },
        ]
        // console.log(data)
    }

    return(
        <div>
            {playerOne && playerTwo && 
            // <ResponsiveContainer width="90%" height={450} className="center">
            <LineChart
                className="center"
                width={1000}
                height={450}
                data={data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 200]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Player1" name={playerOne.name} stroke="#8884d8" />
                <Line type="monotone" dataKey="Player2" name={playerTwo.name} stroke="#82ca9d" />
            </LineChart>
            // </ResponsiveContainer>
            }
        </div>
    )
}

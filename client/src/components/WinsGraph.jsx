import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Area, BarChart } from 'recharts';
import Button from '@material-ui/core/Button';

export default (props) => {
    const {allTeams, setAllTeams, loaded, setLoaded} = props;
    // const [allTeams, setAllTeams] = useState([]);
    // const [loaded, setLoaded] = useState(false);
    const [sortByWins, setSortByWins] = useState(false)
    const [sortByColor, setSortByColor] = useState(false)
    const [sortByDivision, setSortByDivision] = useState(false)

    // console.log("This is allTeams:" + allTeams)

    useEffect(() => {
        axios.get('http://localhost:8000/api/team/')
        .then(response => {
            setAllTeams(response.data);
            setLoaded(true)
        });
    },[],)

    const data =[];

    if(allTeams){
        // console.log("HERHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        let avg_wins = 0;
        let sum_wins = 0;
        allTeams.forEach(team => {
            sum_wins = sum_wins + team.wins
        })
        avg_wins = sum_wins/allTeams.length;
        // console.log(avg_wins)
        // let avg_avg_ticket_cost = 0;
        // let sum_avg_ticket_cost = 0;
        // allTeams.forEach(team => {
        //     sum_avg_ticket_cost = sum_avg_ticket_cost + team.avg_ticket_cost
        // })
        // avg_avg_ticket_cost = sum_avg_ticket_cost/allTeams.length;
        // console.log(avg_avg_ticket_cost)
        if(sortByWins === true){
            allTeams.sort((a,b) => (a.wins < b.wins) ? 1 : (a.wins === b.wins) ? ((a.city > b.city) ? 1 : -1) : -1).forEach(team => {
                data.push({Name: `${team.abbr}`, Wins: `${team.wins}`, league_avg: `${avg_wins.toFixed(1)}`} );
            })
        }else if(sortByColor === true){
            allTeams.sort((a,b) => (a.hex_color > b.hex_color) ? 1 : -1).forEach(team => {
            data.push({Name: `${team.abbr}`, Wins: `${team.wins}`, league_avg: `${avg_wins.toFixed(1)}`} );
            })
        }else if(sortByDivision === true){
            allTeams.sort((a,b) => (a.division > b.division) ? 1 : (a.division === b.division) ? ((a.wins < b.wins) ? 1 : -1) : -1).forEach(team => {
                data.push({Name: `${team.abbr}`, Wins: `${team.wins}`, league_avg: `${avg_wins.toFixed(1)}`} );
                })
        }else{
            allTeams.sort((a,b) => (a.hex_color > b.hex_color) ? 1 : -1).forEach(team => {
                data.push({Name: `${team.abbr}`, Wins: `${team.wins}`, league_avg: `${avg_wins.toFixed(1)}`} );
                })
        }
        // data.filter(team => team.abbr === "MLB")
        // console.log(allTeams);
    }
    const onClickSortByWins = (e) => {
        e.preventDefault();
        setSortByWins(true)
        setSortByColor(false)
        setSortByDivision(false)
    }
    const onClickSortByDivision = (e) => {
        e.preventDefault();
        setSortByWins(false)
        setSortByColor(false)
        setSortByDivision(true)
    }
    const onClickSortByColor = (e) => {
        e.preventDefault();
        setSortByWins(false)
        setSortByColor(true)
        setSortByDivision(false)
    }

      
    return(
        <div>
            <h1>Team Wins (2016 Season)</h1>
            <h5>Gray area denotes league average</h5>
            {/* <ResponsiveContainer> */}

            {loaded &&
            // <ResponsiveContainer width="97%" height={400} className="center">
            <BarChart 
            className="center"
            width={1250}
            height={400}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Name" type='category'  />
                <YAxis domain={[0, 120]} tick={{dx: -10}}/>
                <Tooltip />
                {/* <Legend /> */}
                <Area type="monotone" dataKey="league_avg" fill="#CBD1D6" stroke="#CBD1D6" />
                <Bar dataKey="Wins" barSize={20} radius={[20,20,0,0]}>
                    {
                    allTeams.map((team, index) => {
                    return <Cell key={index} fill={team.hex_color} />;
                    })
                    }
                </Bar>
                {/* <Line type="monotone" dataKey="league_avg" stroke="#ff7300" /> */}
            </BarChart>
            // </ResponsiveContainer>
            }
            <Button variant="contained" onClick={onClickSortByWins}>Sort By Total Wins</Button>
            <Button variant="contained" onClick={onClickSortByDivision}>Sort By Division</Button>
            <Button variant="contained" onClick={onClickSortByColor}>Sort By Team Color</Button>

        </div>
    )
}
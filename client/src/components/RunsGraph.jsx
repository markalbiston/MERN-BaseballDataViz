import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import Button from '@material-ui/core/Button';

export default (props) => {
    const {allTeams, setAllTeams, loaded, setLoaded} = props;
    // const [allTeams, setAllTeams] = useState([]);
    // const [loaded, setLoaded] = useState(false);
    const [sortByRunsScored, setSortByRunsScored] = useState(false)
    const [sortByRunsAllowed, setSortByRunsAllowed] = useState(false)
    const [sortByColor, setSortByColor] = useState(false)
    const [sortByDivision, setSortByDivision] = useState(false)
    const [sortByDifferential, setSortByDifferential] = useState(false)

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
        if(sortByRunsScored === true){
            allTeams.sort((a,b) => (a.offense.runs_scored < b.offense.runs_scored) ? 1 : (a.offense.runs_scored === b.offense.runs_scored) ? ((a.city > b.city) ? 1 : -1) : -1).forEach(team => {
                data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`} );
            })
        }else if(sortByRunsAllowed === true){
            allTeams.sort((a,b) => (a.defense.runs_allowed > b.defense.runs_allowed) ? 1 : (a.defense.runs_allowed === b.defense.runs_allowed) ? ((a.city > b.city) ? 1 : -1) : -1).forEach(team => {
                data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`} );
            })
        }else if(sortByDifferential === true){
            allTeams.sort((a,b) => (a.offense.runs_scored - a.defense.runs_allowed < b.offense.runs_scored-b.defense.runs_allowed) ? 1 : (a.offense.runs_scored - a.defense.runs_allowed === b.offense.runs_scored-b.defense.runs_allowed) ? ((a.nickname > b.nickname) ? 1 : -1) : -1).forEach(team => {
                data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`});
            })
        }else if(sortByColor === true){
            allTeams.sort((a,b) => (a.hex_color > b.hex_color) ? 1 : -1).forEach(team => {
            data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`} );
            })
        }else if(sortByDivision === true){
            allTeams.sort((a,b) => (a.division > b.division) ? 1 : (a.division === b.division) ? ((a.city > b.city) ? 1 : -1) : -1).forEach(team => {
                data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`} );
                })
        }else{
            allTeams.sort((a,b) => (a.hex_color > b.hex_color) ? 1 : -1).forEach(team => {
                data.push({name: `${team.abbr}`, runs_scored: `${team.offense.runs_scored}`, runs_allowed: `-${team.defense.runs_allowed}`, differential: `${team.offense.runs_scored - team.defense.runs_allowed}`} );
                })
        }
        
        
        
        // console.log(data);

    }

    const onClickSortByRunsScored = (e) => {
        e.preventDefault();
        setSortByDifferential(false)
        setSortByRunsScored(true)
        setSortByRunsAllowed(false)
        setSortByColor(false)
        setSortByDivision(false)
    }
    const onClickSortByRunsAllowed = (e) => {
        e.preventDefault();
        setSortByDifferential(false)
        setSortByRunsScored(false)
        setSortByRunsAllowed(true)
        setSortByColor(false)
        setSortByDivision(false)
    }
    const onClickSortByDifferential = (e) => {
        e.preventDefault();
        setSortByDifferential(true)
        setSortByRunsScored(false)
        setSortByRunsAllowed(false)
        setSortByColor(false)
        setSortByDivision(false)
    }
    const onClickSortByDivision = (e) => {
        e.preventDefault();
        setSortByDifferential(false)
        setSortByRunsScored(false)
        setSortByRunsAllowed(false)
        setSortByColor(false)
        setSortByDivision(true)
    }
    const onClickSortByColor = (e) => {
        e.preventDefault();
        setSortByDifferential(false)
        setSortByRunsScored(false)
        setSortByRunsAllowed(false)
        setSortByColor(true)
        setSortByDivision(false)
    }

    const CustomTooltipContent = props => {
        // payload[0] doesn't exist when tooltip isn't visible
        if (props.payload[0] != null) {
          // mutating props directly is against react's conventions
          // so we create a new payload with the name and value fields set to what we want
          const newPayload = [
            {
              name: 'differential',
              // all your data which created the tooltip is located in the .payload property
              value: props.payload[0].payload.differential,
              // you can also add "unit" here if you need it
            },
            ...props.payload,
          ];
      
          // we render the default, but with our overridden payload
          return <DefaultTooltipContent {...props} payload={newPayload} />;
        }
      
        // we just render the default
        return <DefaultTooltipContent {...props} />;
      };

      
    return(
        <div>
            <h1>2016 Runs Scored vs Runs Allowed</h1>
            <h5>Runs Scored showed in team color, Runs Allowed shown in gray</h5>
            {loaded &&
            // <ResponsiveContainer width="94%" height={400} className="center">
            <BarChart
            className="center"
            width={1250}
            height={400}
            data={data}
            stackOffset="sign"
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltipContent} />
                {/* <Legend /> */}
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="runs_scored" stackId="stack" barSize={20} radius={[20,20,0,0]}>
                    {
                    allTeams.map((team, index) => {
                    return <Cell key={index} fill={team.hex_color} />;
                    })
                    }
                </Bar>
                <Bar dataKey="runs_allowed" stackId="stack" barSize={20} radius={[20,20,0,0]} >
                    {
                    allTeams.map((team, index) => {
                    return <Cell key={index} fill="#85929E" />;
                    })
                    }
                </Bar>
            </BarChart>
            // </ResponsiveContainer>
            }
            <Button variant="contained" onClick={onClickSortByDifferential}>Sort By Run Differential</Button>
            <Button variant="contained" onClick={onClickSortByRunsScored}>Sort By Runs Scored</Button>
            <Button variant="contained" onClick={onClickSortByRunsAllowed}>Sort By Runs Allowed</Button>
            <Button variant="contained" onClick={onClickSortByDivision}>Sort By Division</Button>
            <Button variant="contained" onClick={onClickSortByColor}>Sort By Team Color</Button>
        </div>
    )
}
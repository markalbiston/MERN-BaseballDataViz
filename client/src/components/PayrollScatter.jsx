import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Label} from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

export default () => {
    const [allTeams, setAllTeams] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const data = [];

    useEffect(() => {
        axios.get('http://localhost:8000/api/team/')
        .then(response => {
            setAllTeams(response.data);
            setLoaded(true);
        })
    })

    let minTicket = 100;
    let maxTicket = 0;
    if(allTeams){
        // console.log("HERHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        allTeams.sort((a,b) => (a.city > b.city) ? 1 : -1).forEach(team => {
            data.push({Name: `${team.abbr}`, Payroll: `${team.payroll}`, Wins: `${team.wins}`, z:`${team.avg_ticket_cost}`});
            if(team.avg_ticket_cost < minTicket){
                minTicket = team.avg_ticket_cost
            }
            if(team.avg_ticket_cost > maxTicket){
                maxTicket = team.avg_ticket_cost
            }
        })

        // console.log(data);

    }

    const CustomTooltipContent = props => {
        // payload[0] doesn't exist when tooltip isn't visible
        if (props.payload[0] != null) {
          // mutating props directly is against react's conventions
          // so we create a new payload with the name and value fields set to what we want
          const newPayload = [
            {
              name: 'Team',
              // all your data which created the tooltip is located in the .payload property
              value: props.payload[0].payload.Name,
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
            <h1>Team Payroll vs Wins (2016 Season)</h1>
            <h5>Bubble size denotes average ticket price (larger = more expensive)</h5>
            {loaded &&
            
            <ScatterChart
                className="center"
                width={1000}
                height={400}
                margin={{
                top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid />
                {/* <Tooltip content={this.renderTooltip} /> */}
                <XAxis type="number" domain={[50000000, 275000000]} dataKey="Payroll" name="Payroll" unit="" tickFormatter ={(tick) => tick.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\$?)([\d,]+)/g, "$$$2")} >
                    <Label value="Team Payroll" position="bottom" offset={5}/>
                </XAxis>
                <YAxis type="number" domain={[50,110]} dataKey="Wins" name="Wins" unit="" >
                    <Label value="Wins" position="left" offset={-20} />
                </YAxis>
                <ZAxis type="number" dataKey="z" name="Avg Ticket Cost" unit="" range={[360, 200]} />
                <Tooltip cursor={{ strokeDasharray: '1 1' }} content={CustomTooltipContent} />
                <Scatter name="" data={data}>
                    {
                    allTeams.map((team, index) => {
                    return <Cell key={index} fill={team.hex_color}/>
                    })
                    }
                </Scatter>
            </ScatterChart>
            
            }
        </div>
    )
}
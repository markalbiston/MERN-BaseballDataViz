import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { PieChart, Pie, Sector } from 'recharts';

export default (props) => {
    const {team, setTeam, id} = props;
    const [activeIndex, setActiveIndex] = useState(0);

    

    useEffect(() => {
        axios.get('http://localhost:8000/api/team/' + id)
        .then(response => {
            setTeam(response.data);
            // console.log(response.data);
            // setLoaded(true)
        })
    },[id])
    
    const data = [];


    if(team){
        data.push({
            name: 'Hits',
            value: team.offense.hits
        },
        {
            name: 'Strikeouts',
            value: team.offense.strikeouts
        },
        {
            name: 'Walks',
            value: team.offense.walks
        },
        {
            name: 'Groundout/Flyout/Sacrifice',
            value: team.offense.plate_appearances - team.offense.hits - team.offense.walks - team.offense.strikeouts
        })
    }
      
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
          cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
          fill, payload, percent, value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
      
        return (
          <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </g>
        );
    };

    const onPieEnter = (data, index) => {
        setActiveIndex(index)
    }

    return(
        <div >
        {team && <PieChart width={610} height={420}>
            <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={305}
            cy={195}
            innerRadius={130}
            outerRadius={160}
            fill={team.hex_color}
            dataKey="value"
            onMouseEnter={onPieEnter}
            />
        </PieChart>}</div>
    )
}
import React from 'react';
import { scaleLinear, scaleBand, max, groups } from 'd3';

const BarChart = ({width, height, data}) => {

    const genreColorMap = {
        "Non-fiction": "#8c510a",
        "Fantasy": "#c7eae5",
        "Science fiction": "#5ab4ac",
        "Horror": "#01665e",
        "Mystery": "#d8b365",
        "Lit-fic": "#f6e8c3", // Default color for blanks or missing values
    };

   const uniqueGenres = groups(data, d => d.genre);

   const genreData = uniqueGenres.map((d,i) => {return {mygenres: d[0], genrecount: d[1].length}}).sort((a,b) => b.genrecount - a.genrecount)

   const margin = 100;

   const xScale = scaleLinear()
        .domain([0, max(genreData, d=> d.genrecount)])
        .range([0, width-margin*6])

    const yScale = scaleBand()
        .domain(genreData)
        .range([0, height/2])
    
    const rectangles = genreData.map(d => (
        <rect
        key={d.mygenres}
        x={margin}
        y={yScale(d)}
        height={yScale.bandwidth()}
        width={xScale(d.genrecount)}
        fill={genreColorMap[d.mygenres]}
        stroke="#FFF"
        >
        </rect>
        ))

    const labels = genreData.map(d => (
        <text 
        textAnchor='start'
        fill='black'
        key={d.mygenres}
        x={xScale(d.genrecount) + margin*1.2}   
        y={yScale(d) + yScale.bandwidth()/2}
        fontSize='30'
        >{d.mygenres}: {d.genrecount}</text>
    
    ))

    return<svg viewBox={`0 0 ${width} ${height}`}>
    {rectangles}
    {labels}
    </svg>
}

export default BarChart;


import React, { useEffect, useRef, useState } from 'react';
import { scaleLinear, max, min, forceSimulation, forceX, forceY, forceCollide, select, event } from 'd3';
import './App.css';

const ScatterPlot = ({ width, height, indata }) => {
  const margin = 20;
  const svgRef = useRef();
  const circlesGroupRef = useRef();
  const tooltipRef = useRef();
  const legendRef = useRef();

  const [selectedRating, setSelectedRating] = useState('all');

  useEffect(() => {

    const data = selectedRating === 'all' ? indata : indata.filter(d => d.rating.toString() === selectedRating.toString());

    const genreColorMap = {
        "Non-fiction": "#8c510a",
        "Fantasy": "#c7eae5",
        "Science fiction": "#5ab4ac",
        "Horror": "#01665e",
        "Mystery": "#d8b365",
        "Lit-fic": "#f6e8c3" // Default color for blanks or missing values
    }

    const legend = select(legendRef.current)
      .attr('class', 'legend')
      .attr('transform', 'translate(10, 10)');

    const legendItems = Object.entries(genreColorMap);

    legend.selectAll('circle')
        .data(legendItems)
        .enter()
        .append('circle')
        .attr('cy',(_,i) => i*15)
        .attr('cx', 0)
        .attr('r', 5)
        .attr('fill', d => d[1])
    
    legend.selectAll('text')
        .data(legendItems)
        .enter()
        .append('text')
        .attr('y', (_,i) => i*15 + 3)
        .attr('x', 6)
        .attr('font-size', 8)
        .text(d => d[0])

    const xScale = scaleLinear()
      // .domain([min(data, d => d.date_read), max(data, d => d.date_read)])
      .domain([min(data, d => d.date_read), max(data, d => d.date_read)])
      .range([margin*2, width - margin*2]);

    const pageScale = scaleLinear()
      .domain([0, max(data, d => (isNaN(d.pages) ? 0 : d.pages))])
      .range([0, 30]);

    const simulation = forceSimulation(data)
      .force("x", forceX().strength(0.8).x(d => xScale(d.date_read)))
      .force('y', forceY((height-margin)/2))
      .force('collide', forceCollide().radius(d => pageScale(d.pages) + 2).strength(0.5))
      .on('tick', () => {
        // Update circle positions on each tick
        select(circlesGroupRef.current)
          .selectAll('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });

    // Save the simulation instance to use it later (e.g., to restart the simulation)
    svgRef.current.simulation = simulation;

    simulation.restart();

    select(circlesGroupRef.current)
    .selectAll('circle')
    .remove();

    // Initial rendering of circles
    const newcircles = select(circlesGroupRef.current)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date_read))
      .attr('cy', (height-margin*2) / 2)
      .attr('r', d => pageScale(d.pages))
      .attr('fill', function(d){return genreColorMap[d.genre] || genreColorMap["Missing"]})
      .style("stroke", "#4d4d4d")
      .attr("stroke-dasharray", function(d) {
            var circumference = 2 * Math.PI * (pageScale(d.pages));  // Calculate circumference
            var ratio = d.rating*0.2;  // Adjust completeness ratio (e.g., 0.7 for 70% complete)
            return circumference * ratio + " " + circumference * (1 - ratio);})
        .attr("stroke-dashoffset", function(d) {
            return -3.85 * Math.PI * pageScale(d.pages);  // Adjust dash offset to position the stroke
                })
        .attr("stroke-width", 2)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

        function handleMouseOver(event, d) {
            const tooltipDiv = tooltipRef.current;
            // Display tooltip on mouseover
            const mytooltip = select(tooltipDiv); // Make sure ID matches the one used in the JSX
            mytooltip.transition().duration(200).style('opacity', 0.9);
            mytooltip.html("<b>" + d.title + "</b>" + "<br>" + d.author + "<br>" + "Genre:" + d.genre + "<br>" + "Date read: " + d.day + "/" + d.month + "/" + d.year + "<br>" + "Pages: " + d.pages + "<br>" + "My rating: " + d.rating + " stars")            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");}
      
    function handleMouseOut() {
        const tooltipDiv = tooltipRef.current;
        // Hide tooltip on mouseout
        select(tooltipDiv).transition().duration(500).style('opacity', 0);
        }

  }, [width, height, indata, selectedRating]);

  const handleRatingChange = (event) => {
    setSelectedRating((event.target.value));
  };

  return (
    <div className='d3container'>
      <label htmlFor="ratingSelect">Filter by rating: </label>
      <select id="ratingSelect" value={selectedRating} onChange={handleRatingChange}>
        <option value="all">All Ratings</option>
        <option value="0">Unrated</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <g ref={circlesGroupRef}></g>
      <g ref={legendRef}></g>
    </svg>
    <div className="tooltip" ref={tooltipRef} style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', fontSize: '12px', backgroundColor: 'white', border: '1px solid black', padding: '8px' }}></div>
    </div>
  );
};

export default ScatterPlot;
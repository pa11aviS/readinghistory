import './App.css';
import * as d3 from 'd3';
import data from './readbooks5.csv';
import React, { useEffect, useState } from 'react';
import ScatterPlot from './ScatterPlot';
import MobileScatterPlot from './MobileScatterPlot';
import BarChart from './GenreBarChart';

const formatDate = date => {
  return date ? new Date(date).toLocaleDateString() : 'Not available';
};

function App() {

  const [myData, setData] = useState([]);

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  console.log(windowWidth)
  console.log(windowHeight)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await d3.csv(data);
        var parseDate = d3.timeParse("%m/%d/%Y");
        const formattedData = csvData.map(d => ({
          title: d.Title,
          author: d.Author,
          genre: d.Genre,
          rating: +d.My_Rating,
          pages: +d.Pages,
          date_read: parseDate(d.Date_Read),
          day: +d.Day,
          month: +d.Month,
          year: +d.Year
        }));

        setData(formattedData);

        console.log(formattedData)

      } catch (error) {
        console.error('Error', error)
      }
    };
  
  fetchData(); }, []);

  if (windowWidth > windowHeight) {

  return (
    <div className="App">
      <div className="header">
        <h1>The (not so) secret reading history</h1>
        <text id='note'>*Circle size shows page number and fullness of black outer ring shows rating. Zero stars mean I didn't give a rating.</text>
      </div>
      <div className="container">
        <div id='yeartext1'><text id='text'>2018</text></div>
        <ScatterPlot width={windowWidth*0.5} height={windowHeight/2.5} indata={myData}></ScatterPlot>
        <div id='yeartext2'><text id='text'>2024</text></div>
      </div>
      <div className="container2">
      <div className="rowcontainer">
      <div className="subheading"><text id='subheadingtext'>Genre tally</text></div>
      <BarChart width={windowWidth} height={windowHeight} data={myData}></BarChart>
      </div>
      <div className="rowcontainer2">
      <div className="subheading"><text id='subheadingtext'>Summary</text></div>
      <div id='summarytext'>
      <p>
        I've logged nearly 300 books so far and what surprised me most was how many I loved and then forgot about entirely until I made this.
      </p>
      <p>
        The other surprise was realising that the books that have stayed with me the most didn't necessarily get the best ratings at the time. <span className='fantasy'> The Name of the Wind</span>, for example, is easily my favourite fantasy series, and I gave both books 4 stars when I read them.
      </p>
      <p>
        This also made me think a lot about my favourite books. I'm pretty selective with the books I choose to read and I gave 80 books (or 30% of everything I read) 5 stars.
      </p>
      <p>
        Going over these, the ones that stand out most are probably <span className='litfic'>Pachinko</span>, all of <span className='nonfiction'>Helen Garner's diaries</span>, <span className='litfic'> A Little Life</span>, <span className='nonfiction'>Three Women</span> and <span className='litfic'>Kitchen</span>.
      </p>
      <p>
        Also, a special shout-out to a tiny little book that I first read before 2018 and so isn't even in this graphic - <span className='nonfiction'>Thomas Gardner's Poverty Creek Journal</span>.
         I don't log re-reads, but if I did, this one would have about 100 circles.
      </p>
      </div>
      </div>
      </div>
    </div>
  );
} else {

  return (
    <div className="MobileApp">
      <div className="header">
        <h1>The (not so) secret reading history</h1>
        <div id='notediv'><text id='note'>*Circle size shows page number and fullness of black outer ring shows rating. Zero stars mean I didn't give a rating.</text></div>
      </div>
      <div className="mobilecontainer">
        <MobileScatterPlot width={windowWidth/2} height={windowHeight} indata={myData}></MobileScatterPlot>
        <div id='yeartext2'><text id='text'>2024</text></div>
        <div className="rowcontainer1">
        <div className="subheadingmobile"><text id='subheadingtext'>Genre tally</text></div>
      <BarChart width={windowWidth*2.5} height={windowHeight} data={myData}></BarChart>
      </div>
      <div className="rowcontainer2mobile">
      <div className="subheading"><text id='subheadingtextmobile'>Summary</text></div>
      <div id='summarytextmobile'>
      <p>
        I've logged nearly 300 books so far and what surprised me most was how many I loved and then forgot about entirely until I made this.
      </p>
      <p>
        The other surprise was realising that the books that have stayed with me the most didn't necessarily get the best ratings at the time. <span className='fantasy'>The Name of the Wind</span>, for example, is easily my favourite fantasy series, and I gave both books 4 stars when I read them.
      </p>
      <p>
        This also made me think a lot about my favourite books. I'm pretty selective with the books I choose to read and I gave 80 books (or 30% of everything I read) 5 stars.
      </p>
      <p>
        Going over these, the ones that stand out most are probably <span className='litfic'>Pachinko</span>, all of <span className='nonfiction'>Helen Garner's diaries</span>, <span className='litfic'> A Little Life</span>, <span className='nonfiction'>Three Women</span> and <span className='litfic'>Kitchen</span>.
      </p>
      <p>
        Also, a special shout-out to a tiny little book that I first read before 2018 and so isn't even in this graphic - <span className='nonfiction'>Thomas Gardner's Poverty Creek Journal</span>.
         I don't log re-reads, but if I did, this one would have about 100 circles.
      </p>
      </div>
      </div>
      </div>
    </div>
  )
}
};

export default App;

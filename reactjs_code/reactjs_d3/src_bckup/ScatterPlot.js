import React, { Component } from 'react';
import * as d3 from "d3";
//import d3-scale as d3-scale from "d3";
//import * as d3scale from "d3-scale";
//import { scale } from 'd3-scale';
import axios from "axios";


import querystring from "querystring";
export default class ScatterPlot extends Component {
    state = {
    //intializing state
    data:[ {
        values:
            [{ h: 0, s: 0 }]},
        {dept:[[{d_di:0,dept_name:'ZZ'}]]}
    ],
    deptId:'0',
    deptName:'--Select--',
     };
   

    constructor(props) {
        super(props);
        this.addValues = this.addValues.bind(this);
        this.deptDropDown=this.deptDropDown.bind(this);
        this.handleChange=this.handleChange.bind(this);
    
    
    }

    componentDidMount(depid) {

        axios
        .post("http://localhost:8085/passDeptName",  querystring.stringify({"depid":depid})) //posting data using axios in server
        .then(res => {
            
          console.log("RES");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });



        axios.get("http://localhost:8085/DataHeightSal").then(res => {
            //console.log(res);
            const data = res.data;
            this.setState({ data });
            this.addValues(depid,data);



        });
    }

postDept(depid,data1)
{

  
}


    addValues(depid,data1) {

        var data = [
            {
                values: []
            },
            {
                dept:[]
            }
        ];

console.log("addValues"+depid);
        var dataset = [];
        var i;
      //  d3.selectAll("svg").remove();


        for (i = 0; i < this.state.data[0].values.length; i++) {
            if(parseInt(this.state.data[0].values[1].dept_id)==depid)
            {
               

            const ht = parseInt(this.state.data[0].values[i].h);
            const sal = parseInt(this.state.data[0].values[i].s);
            const arr = [];

            arr.push(ht);
            arr.push(sal);



            dataset.push(arr);
            }
            
            else
            return <h1>Select a department</h1>;



        }
        console.log("Dataset ");
console.log(dataset);


        var padding = 100;
        var xScale = d3.scaleLinear().domain([d3.min(dataset, function (d) { return d[0] - 5; }), d3.max(dataset, function (d) { return d[0]; })])
            .range([padding, 700 - padding]).clamp(true);
        console.log("max x" + d3.max(dataset, function (d) { return d[0]; }));
        //var yScale=d3.scaleLinear().domain([0,1600000]).range([480,100]).clamp(true);
        var yScale = d3.scaleLinear().domain([d3.min(dataset, function (d) {console.log(d[1]); return d[1]; }), d3.max(dataset, function (d) { return d[1]; })])
            .range([500 - padding, padding]).clamp(true);
    var rScale = d3.scaleLinear()
                          .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                        .range([2, 5]);
        var xAxis = d3.axisBottom()
            .scale(xScale).ticks(10);
        var yAxis = d3.axisLeft().scale(yScale).ticks(8);
        var svg = d3.select("div")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 2000);
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d[0]);
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
             .attr("r", function(d){
                 return rScale(d[1]);
            })
            .style("color", "red");

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d[0] + "," + d[1];
            })
            .attr("x", function (d) {
                return xScale(d[0]);
            })
            .attr("y", function (d) {
                return yScale(d[1]);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");
        svg.append("g")
            .attr("className", "axis")
            .attr("transform", "translate(0," + (500 - padding) + " )")
            .call(xAxis);

        svg.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);

       // console.log(dataset);
    }

    deptDropDown = () =>
    {
      
      return this.state.data[1].dept.map(value=>{
      return (
            

          <option value={value.d_id}>{value.dept_name} </option>

      )
      
      }) 
      
    }

    handleChange(e)
    {
        // this.setState({deptId : e.target.value})
        this.componentDidMount(e.target.value)
       this.addValues(e.target.value);
    }


    render() {

        return (
            <div class="bid">

              
                <select onChange={this.handleChange}>
                    <option value={0}>- - Select - -</option>
                    {this.state && this.state.data && this.deptDropDown()}
                </select>


            </div>
        )
    }
}


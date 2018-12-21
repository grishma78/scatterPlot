import React, { Component } from 'react';
import * as d3 from "d3";
//import d3-scale as d3-scale from "d3";
//import * as d3scale from "d3-scale";
//import { scale } from 'd3-scale';
import axios from "axios";


import querystring from "querystring";
export default class ScatterPlot extends Component {


    constructor(props) {
        super(props);
        this.addValues = this.addValues.bind(this);
        this.deptDropDown = this.deptDropDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            options: [],
            data: [
            ]};


    }

    

    componentDidMount() {

        axios.get("http://localhost:8081/getDepartment").then(res => {
            console.log(res.data);
           
            this.setState({ options: res.data });

        });

    }




    addValues() {

        console.log(this.state.data);


        var dataset = [];
        var i;

d3.select("svg").remove();

        for (i = 0; i < this.state.data[0].values.length; i++) {
          

            const ht = parseInt(this.state.data[0].values[i].h);
            const sal = parseInt(this.state.data[0].values[i].s);
            const arr = [];

            arr.push(ht);
            arr.push(sal);



            dataset.push(arr);

        }



        var padding = 100;
        var xScale = d3.scaleLinear().domain([d3.min(dataset, function (d) { return d[0] - 5; }), d3.max(dataset, function (d) { return d[0]+5; })])
            .range([padding, 700 - padding]).clamp(true);
        console.log("max x" + d3.max(dataset, function (d) { return d[0]; }));
        //var yScale=d3.scaleLinear().domain([0,1600000]).range([480,100]).clamp(true);
        var yScale = d3.scaleLinear().domain([d3.min(dataset, function (d) { console.log(d[1]); return d[1]; }), d3.max(dataset, function (d) { return d[1]; })])
            .range([500 - padding, padding]).clamp(true);
        var rScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d[1]; })])
            .range([2, 5]);
        var xAxis = d3.axisBottom()
            .scale(xScale).ticks(10);
        var yAxis = d3.axisLeft().scale(yScale).ticks(8);
        var svg = d3.select("div")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 700);
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
            .attr("r", function (d) {
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

        console.log(dataset);
    }

    deptDropDown = () => {

        return this.state.data[1].dept.map(value => {
            return (

<center>
                <option value={value.d_id}>{value.dept_name} </option>
                </center>
            )

        })

    }

    handleChange(e) {
       
        let _this = this;

        axios
        .get("http://localhost:8081/getheightsal?depid="+ e.target.value) //posting data using axios in server
        .then(res => {

          console.log("RES");
          this.setState({ data: res.data });
          _this.addValues();
        })
        .catch(err => {
          console.log(err);
        });

    }


    render() {

        console.log(this.state.options);

        return (
            <div className="bid">


                <select onChange={this.handleChange}>
                    <option>select</option>
                    {this.state.options.map(opt => (
                        <option key={opt.d_id} value={opt.d_id}>{opt.dept_name}</option>
                    ))}
                </select>


            </div>
        )
    }
}

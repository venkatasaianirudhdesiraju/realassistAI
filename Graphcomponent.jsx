// PDFComponent.js

import { useState, useEffect } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
export const options = {
    responsive: true,
};
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

var data1 = [];
var data2 = [];
var c = 0;
function Graphcomponent() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPost = async () => {

            // Await make wait until that  
            // promise settles and return its result 
            const response = await fetch(
                "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv");

            data1 = await response.json();
            // After fetching data stored it in posts state. 
            setPosts(data1);
            c = 1;
            // Closed the loading page 
            setLoading(false);
        };
        

        // Call the function 
        loadPost();
    }, []); 
    console.log(posts);
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }
    const generatePDF = () => {
        const doc = new jsPDF();
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        // Add header
        doc.text('RealAssist.AI', 10, 10);
        doc.text('123 Main Street, Denver, NH 03820-4667', 95, 10);
        // Add footer
        doc.text('Reported Generated on' + getDate(), 10, 280);
        doc.text('RealAssistPropertyReport' , 135, 280);

        // Add crime title with blue bar
        doc.setDrawColor(0, 0, 255); // Set the stroke color to blue
        doc.setLineWidth(1); // Set the line width
        doc.line(10, 15, 200, 15); // Draw a blue bar
        doc.text('Crime', 10, 35); doc.line(30, 35, 200, 35);

        // Add a link
        doc.setTextColor(0, 0, 255); // Set the text color to blue


        // Add the graph as an image
        const canvas = document.getElementById('mychart');
        const imgData = canvas.toDataURL('image/png', 1.0);
        doc.addImage(imgData, 'PNG', 35, 50, 150, 80);

        // Save the PDF
        doc.save('crime_report.pdf');
    };
    var data_burglary = [];
    const labels1 = [ "2015", "2016", "2017", "2018", "2019", "2020"];
    if (data1 != 0) {
           for (var i = 0; i < data1["data"]["length"]; i++) {
                data_burglary[i] = (data1["data"][i]["Burglary"]);
                labels1[i] = (data1["data"][i]["data_year"]);
            }
        
            
        data2 = {
            labels: labels1,
            datasets: [
                {
                    label: 'Burglary',
                    data: data_burglary,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };

        

        return (
            <div>
            <div>
                <button onClick={generatePDF}>Generate PDF</button></div>
                <div>
                <br></br><Line id = "mychart" ClassName= "custom-chart" options={options} data={data2} />
                </div>
            </div>
        );
    }
    else {
       return console.log("No values yet");
    }
    }



export default Graphcomponent;

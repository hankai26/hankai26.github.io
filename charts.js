function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data);

    var sampleNames = data.names;

    // sampleNames =     
    // <option value="940">940</option>
    // <option value="941">941</option>
    // <option value="943">943</option>

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var allSamples = data.samples;
    var allMetadata = data.metadata;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filterSelectSam = allSamples.filter(s => s.id == sample);
    var filterSelectMeta = allMetadata.filter(m => m.id === parseInt(sample));
    
    //  5. Create a variable that holds the first sample in the array.
    var selectedSam = filterSelectSam[0];
    var selectedMeta = filterSelectMeta[0];

    console.log(selectedSam);
    console.log(selectedMeta);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    // ** No need to sort, since the original data is in order
    // var sortedSamples = allSam_values.sort((a, b)=>
    //   b.sample_values - a.sample_values);

    var allOtu_ids = selectedSam.otu_ids;
    var allSam_values = selectedSam.sample_values;
    var allOtu_labels = selectedSam.otu_labels;
    //console.log(allOtu_ids, allSam_values, allOtu_labels);
    console.log(allOtu_ids, allSam_values);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    var topTenOtu_ids = allOtu_ids.slice(0,10);
    var topTenSam_values = allSam_values.slice(0,10);
    var topTenOtu_labels = allOtu_labels.slice(0,10);
    //console.log("**********"+topTenOtu_labels+"***********");

    // var topTenSam_values = topTenOtu.map(x => x.sample_values);
    // var topTenOtu_ids = topTenOtu.map(x => x.otu_ids);
    // var topTenOtu_labels = topTenOtu.map(x => x.otu_labels);
    // var topTenOtu_labels = topTenOtu.map(x => x.otu_labels);
    var yticks = topTenOtu_ids.map(x=>"OTU "+ x);


    //----------## Bar charts ##----------
    // 8. Create the trace for the bar chart. 
    var barData = [{
      y: yticks,
      x: topTenSam_values,
      type: "bar",
      orientation: "h",
      text: topTenOtu_labels
      ///hoverinfo: topTenOtu_labels
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {autorange:"reversed"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  

    //----------##Bubble charts ##----------
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: allOtu_ids,
      y: allSam_values,
      text: allOtu_labels,
      mode: "markers",
      marker: {
        size: allSam_values,
        //??The otu_ids as the marker colors
        color: allOtu_ids,
        colorscale: [
          ['0.0', 'rgb(165,0,38)'],
          ['0.111111111111', 'rgb(215,48,39)'],
          ['0.222222222222', 'rgb(244,109,67)'],
          ['0.333333333333', 'rgb(253,174,97)'],
          ['0.444444444444', 'rgb(254,224,144)'],
          ['0.555555555556', 'rgb(224,243,248)'],
          ['0.666666666667', 'rgb(171,217,233)'],
          ['0.777777777778', 'rgb(116,173,209)'],
          ['0.888888888889', 'rgb(69,117,180)'],
          ['1.0', 'rgb(49,54,149)']
        ],
      },
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {
      title: "OTU ID"
      },
      height: 400,
      width: 1158
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    //----------## gauge charts ##----------
    // Create a variable that holds the samples array. 
    // Create a variable that filters the samples for the object with the desired sample number.
    // Filter the data for the object with the desired sample number
    // Use d3 to select the panel with id of `#sample-metadata`
    
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    // Create a variable that holds the first sample in the array.

    // 2. Create a variable that holds the first sample in the metadata array.
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    // 3. Create a variable that holds the washing frequency.
    var wfreq = selectedMeta.wfreq;
    console.log(wfreq);
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency" + "<br>" + "<span style='font-size: 12px;'>Scrubs per Week</span>"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10] },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "blue" },
          { range: [8, 10], color: "green" }
        ]
      },
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 471, 
      height: 450, 
      margin: { t: 0, b: 0 } ,
      font: { color: "black", family: "Arial" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });


}

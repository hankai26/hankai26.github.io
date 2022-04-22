function init() {
    var selector = d3.select("#selDataset");
  

    //??https://courses.bootcampspot.com/courses/1159/pages/12-dot-4-3-belly-button-demographics-panel?module_item_id=440274
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    //buildCharts(newSample);
}


//?? why resultArray[0]
//?? why  PANEL.append("h6")
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      //PANEL = Object.entries(result)
      //PANEL = Object.entries(result).forEach(([key,value])=>
        //{console.log(key + ':' + value);});
      PANEL = Object.entries(result).forEach(([key,value])=>
        PANEL.append("h6").text(key + ': ' + value));
      //??PANEL.append("h6").text(result.location);
    });
  }
  
  //modify the buildMetadata() function 
  //to populate the Demographic Info panel 
  // with the rest of the demographic data
  
//Ref   d3.json("samples.json").then(function(data){
//     firstPerson = data.metadata[0];
//     Object.entries(firstPerson).forEach(([key, value]) =>
//       {console.log(key + ': ' + value);});
// });
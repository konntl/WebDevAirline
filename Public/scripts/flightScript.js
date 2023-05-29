const toggleClick = (event, idNum) => {
    for(let i=0;i<idNum.length;i++){
      let flight = document.querySelector('#flight'+idNum[i]);
      let cb = document.querySelector('#btn-flight'+idNum[i]);
      if(idNum[i] == event.target.id.slice(10)){
        flight.classList.toggle('flightClicked');
      }
      else{
        flight.classList.remove('flightClicked');
        cb.checked = false;
      }
    }
  }
  
  const nodesDpt = document.querySelector('.depFlightsContainer').childNodes;
  const idNumDpt = [];
  for(let i=0; i<nodesDpt.length; i++) {
    if (nodesDpt[i].nodeName.toLowerCase() == 'div') {
      idNumDpt.push(nodesDpt[i].id.slice(6));
      let el = document.querySelector('#btn-flight'+idNumDpt.slice(-1));
      el.addEventListener("click", function(event) {
        toggleClick(event, idNumDpt);
    });
    }
  }
  
  if(document.querySelector('.retFlightsContainer')){
    const nodesRet = document.querySelector('.retFlightsContainer').childNodes;
    const idNumRet = [];
    for(let i=0; i<nodesRet.length; i++) {
      if (nodesRet[i].nodeName.toLowerCase() == 'div') {
        idNumRet.push(nodesRet[i].id.slice(6));
        let el = document.querySelector('#btn-flight'+idNumRet.slice(-1));
        el.addEventListener("click", function(event) {
          toggleClick(event, idNumRet);
      });
      }
    }
  }
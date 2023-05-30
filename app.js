const centerElement = document.querySelector('.center_element');
const wheel = document.querySelector('.container')


const chooseReward = (key) => {
    const rewardObject = {
        1: "zestaw 1",
        2: "zestaw 2",
        3: "zestaw 3",
        4: "zestaw 4",
        5: "zestaw 5",
        6: "zestaw 6",
        7: "zestaw 7",
        8: "zestaw 8",
        9: "zestaw 9",
        10: "zestaw 10",
        11: "zestaw 11",
        12: "zestaw 12",
        13: "broken"
    }

    return rewardObject[key]
}


centerElement.addEventListener('click', () => {
    const angle = Math.floor(Math.random()*1800);
    wheel.style.transform = "rotate(" + angle + "deg)";
    
    const angleDiff = angle - Math.floor(angle/360)*360;
    const elementCounter = Math.floor((angleDiff+15)/30);

    let elementNumber = 0

    if(Number(angle) > 900){
        elementNumber = 13 - elementCounter;
    }else{
        elementNumber = 13 - elementCounter;
    }

    if(elementNumber < 0){
        elementNumber = 13-elementNumber;
    }

    const reward = chooseReward(elementNumber);
})


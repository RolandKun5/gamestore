(function(){
    const menuItem = document.getElementById('menu-btn').firstChild;
    const logoItem = document.getElementsByClassName('logo-open')[0];
    const priceItems = document.getElementsByClassName('price');
    const totalItem = document.getElementsByClassName('total-p')[0];
    const items = [menuItem,logoItem];
    const pinkColor = 'rgb(250, 18, 161)';
    const pinkShadow = '0 0 .7rem rgb(250, 18, 161)';
    const pinkLightOff = 'rgba(200, 8, 111, 0.432)';
    const yellowColor = 'rgb(255, 251, 0)';
    const yellowShadow = '0 0 .7rem rgb(255, 251, 0)';
    const yellowLightOff = 'rgba(208, 204, 0, 0.829)';
    let lightIsOn = true;
    let lightIsPink = true;
    let helperCounter = 0;
    let msCounter = 100;
    const waiting = 10000;

    function resetHelpers(){
        helperCounter = 0;
        msCounter = 100;
        lightIsOn = true;
    }

    const setStyle = {
        toYellow: function(){
            items.map((item)=>{item.style.color = yellowColor; item.style.textShadow = yellowShadow});
            for(let i = 0; i < priceItems.length; i++){priceItems[i].style.color = yellowColor; priceItems[i].style.textShadow = yellowShadow};
        },
        toPink: function(){
            items.map((item)=>{item.style.color = pinkColor; item.style.textShadow = pinkShadow});
            for(let i = 0; i < priceItems.length; i++){priceItems[i].style.color = pinkColor; priceItems[i].style.textShadow = pinkShadow};
        },
        pinkOff: function(){
            items.map((item)=>{item.style.color = pinkLightOff});
            for(let i = 0; i < priceItems.length; i++){priceItems[i].style.color = pinkLightOff};
        },
        yellowOff: function(){            
            items.map((item)=>{item.style.color = yellowLightOff});
            for(let i = 0; i < priceItems.length; i++){priceItems[i].style.color = yellowLightOff};
        },
        shadowOff: function(){
            items.map((item)=>{item.style.textShadow = 'none'});
            for(let i = 0; i < priceItems.length; i++){priceItems[i].style.textShadow = 'none'}; 
        }
    }

    function changeColor(){
        if(lightIsPink){
            setStyle.toYellow();
            lightIsPink = false;
        }else{
            setStyle.toPink();
            lightIsPink = true;
        }
        resetHelpers();
        setTimeout(() => {
            turnOffAndOnTheLight();
        }, waiting);
    }

    function turnOffAndOnTheLight(){
        if(lightIsOn){            
            if(lightIsPink){    
                setStyle.pinkOff();
            }else{
                setStyle.yellowOff();
            }
            setStyle.shadowOff();
            lightIsOn = false;
        }else{
            if(lightIsPink){
                setStyle.toPink();
            }else{
                setStyle.toYellow();
            }
            lightIsOn = true;
        }

        if(helperCounter < 6){
            setTimeout(() => {
                turnOffAndOnTheLight();
            }, msCounter);
            msCounter += 100;            
            helperCounter++;
        }else if(helperCounter === 6){
            setTimeout(() => {
                changeColor();
            }, 800);
        }
    };

    setTimeout(() => {
        turnOffAndOnTheLight();
    }, waiting);

})();
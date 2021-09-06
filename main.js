fetch("./Stock List.json")
    .then(response => {
        return response.json();
    })
    .then(function (data) {
        let stock = document.querySelector("#searchQuery");
        let submit = document.querySelector("#submit");
        let timePeriod = document.querySelector("#time");
        let openingTime =document.querySelector("#open");
        let closingTime =document.querySelector("#close");
        let high = document.querySelector("#high");
        let low = document.querySelector("#low");
        let key =document.querySelector("#key");
        
        let searchStock = function ()
        {
            let stockName=stock.value;
            let iterator;
            for(iterator=data.length-1;iterator>=0;iterator--)
            {
                if(data[iterator].key === stockName)
                {
                    console.log(data[iterator]);
                    break;
                }
            }
            if(iterator==-1)
            {
                alert("Coudn't find any key");
            }
            else
            {
                appendDetails(iterator,timePeriod.value,stockName);
            }
        }


        let appendDetails = function(position,timePeriod,stockName)
        {
            timePeriod=parseInt(timePeriod);
            let startPos = position-timePeriod+1;
            let minPrice = Number.MAX_VALUE;
            let maxPrice = Number.MIN_VALUE;
            for(let i=position;i>=startPos;i--)
            {
                if(data[i].high > maxPrice)
                {
                    maxPrice = data[i].high;
                }
                if(data[i].low < minPrice)
                {
                    minPrice = data[i].low;
                }
            }
            console.log("maxPrice:", maxPrice);
            console.log("end date:", data[position].label);
            console.log("startPos: ", data[startPos].label);


            openingTime.innerHTML=`Opening price: ${data[startPos].open}&dollar;`;
            closingTime.innerHTML=`Closing price: ${data[position].close}&dollar;`;
            high.innerHTML=`High: ${maxPrice}&dollar;`
            low.innerHTML=`Low: ${minPrice}&dollar;`
            key.innerHTML=`${stockName} stock prices`;
        }

        submit.addEventListener("click", searchStock);
        stock.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
                searchStock();
            }
        });
    });



    
    
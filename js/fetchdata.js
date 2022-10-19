let ctr_group1 = 0;
let ctr_group2 = 0;
let ctr_group3 = 0;

$(()=>{
    //Initial Request for USD, the default selected value
    let currencies = [];
    let exchange_rates = new Array();
    let selected_item = 'USD';

    for(let item of $('option')){
        currencies.push(item.innerText);
    }

    fetchdata(selected_item,currencies,exchange_rates);
    countChild('div#group1',ctr_group1);
    countChild('div#group2',ctr_group2);
    countChild('div#group3',ctr_group3);

    $('select').change((event)=>{
        selected_item = event.target.value;
        clearGroup();
        fetchdata(selected_item,currencies,exchange_rates);
        countChild('div#group1',ctr_group1);
        countChild('div#group2',ctr_group2);
        countChild('div#group3',ctr_group3);
    });
   
});

   
const addToRates = (to,rate,target_array) => {
   target_array.push({
       to: to,
       rate: rate
   });
}

const fetchdata = (selected_item,currencies,exchange_rates,callback) => {
    exchange_rates = [];
    for(let item of currencies){

        if(selected_item.toLowerCase() == item.toLowerCase()){
            continue;
        }
        else{
            item = item.toLowerCase();
            selected_item = selected_item.toLowerCase();

            let main_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selected_item}/${item}.json`;
            let backup_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selected_item}/${item}.min.json`;

            $.get(main_url,(data,status)=>{
                if(status != 'success'){
                    $.get(backup_url,(data,status)=>{
                        if(status != 'success'){
                            return console.log('Something went wrong');
                        }
                        else{
                        addToRates(item,data[item],exchange_rates);
                        groupData(selected_item,item,data);
                        }
                    })
                }
                else{
                    addToRates(item,data[item],exchange_rates);
                    groupData(selected_item,item,data);
                }
            });
        }
    }
}

const groupData = (selected_item,item,data) => {
        let new_element = `
        <tr>
            <td class='labels'>
                <h4>${selected_item.toUpperCase()}-${item.toUpperCase()}</h4>
            <td>
            <td class='values'>
                ${data[item]}
            </td>
        </tr>
        `;

        if( data[item] < 1){
            $('div#group1>table').append(new_element);
            ctr_group1 += 1;
        }
        else if(data[item] >= 1 && data[item] < 1.5){
            $('div#group2>table').append(new_element);
            return ctr_group2 += 1;
        }
        else if(data[item] >= 1.5){
            $('div#group3>table').append(new_element);
            ctr_group3 += 1;
        }
        else{
            console.log('Something went wrong');
        }
}

const clearGroup = () => {
    ctr_group1 = 0;
    ctr_group2 = 0;
    ctr_group3 = 0;
    
    $('div#group1>table').empty();
    $('div#group2>table').empty();
    $('div#group3>table').empty();
}

const countChild = (target,count) => {
    const targetElement= target + ">span";
    console.log(count)

    $(target).text("Count:",count);
}

   
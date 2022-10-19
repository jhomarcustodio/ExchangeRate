$(()=>{
    let currencies = [
        'USD',
        'EUR',
        'AUD',
        'CAD',
        'CHF',
        'NZD',
        'BGN'
    ];

    let select = $("select");

    for(let item of currencies){
        select.append(`<option value="${item}">${item}</option>`)
    }

});
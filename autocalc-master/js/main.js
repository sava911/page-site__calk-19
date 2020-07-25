$(document).ready(function(){
   
    // change color;
    
    $('#colors .color-button').on('click', function() {
       
        var $imgSrc = $(this).attr('data-img-src');
        $('#img-container img').attr('src', $imgSrc);
        
    });
    
    // calculator
    
    var modelSpecs,
        modelSpecsHolder,
        modelPrice,
        modelPriceHolder;
        
    modelSpecsHolder = $('.config');
    modelPriceHolder = $('.rub');   
    
    modelPrice = 0;
    modelSpecs = '';
    
    function calculatePrice() {
        var modelPriceTransmission = $('input[name=transmission]:checked', '#carConfig').val();
        var modelPriceEngine = $('input[name=engine]:checked', '#carConfig').val();
        var modelPricePackage = $('input[name=package]:checked', '#carConfig').val();
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPricePackage = parseInt(modelPricePackage);
        modelPrice = modelPriceTransmission + modelPriceEngine + modelPricePackage;
        
        modelPriceHolder.text(addSpace(modelPrice));
    }
    
    $('#carConfig input').on('change', function() {
        calculatePrice();
        compileSpecs();
        usdConvert();
    });
    
    calculatePrice();
    compileSpecs();
    usdConvert();
    
    // specs text
    
    function compileSpecs() {
        var modelSpecsTransmission = $('input[name=transmission]:checked + label', '#carConfig').text(); 
        var modelSpecsEngine = $('input[name=engine]:checked + label', '#carConfig').text(); 
        var modelSpecsPackage = $('input[name=package]:checked + label', '#carConfig').text(); 
        modelSpecs = modelSpecsEngine + ', ' + modelSpecsTransmission + ', ' + modelSpecsPackage;
        
        modelSpecsHolder.text(modelSpecs);        
    };
    
    // usd
    
    function usdConvert() {
        $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
        var usdCurrency = data.Valute.USD.Value;
        var usdPriceHolder = $('.usd');
        var rubPrice = modelPrice;
        var usdPrice = (rubPrice / usdCurrency);
        usdPrice = (usdPrice).toFixed(0);
            
        usdPriceHolder.text(addSpace(usdPrice));
        });
    };
    
    // add space
    
    function addSpace(nStr) {
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	    }
	    return x1 + x2;
	}
});
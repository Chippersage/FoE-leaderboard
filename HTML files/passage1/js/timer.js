    var mysec;
    var myminute;
    var secondCount;
    var pbi = 1;
    var stopmin = 0;
    var stopsec = 0;
    var mytimersecGlobal = [];
    var mytimerminGlobal = [];
    var mysecGlobal;
    var myminuteGlobal;
    var secondCountGlobal;
    var count = 0;
    var countGlobal = 0;
    var timervalueGlobal = ['00, 00, 00, 00'];
    var timerminGlobal = ['00, 00, 00, 00'];
    var menus;   
    var mytimersec = [];
    var mytimermin = [];
    var mytimersecGlobal = [];
    var mytimerminGlobal = [];
    var countMode = 0;
    countModeLocal = 0;
    function fetch(pageid) {
        $("#mytimerholder").html("LocalValue[" + pageid + "]=" + mytimermin[pageid - 1] + ":" + mytimersec[pageid - 1]);

        pbi = pageid;
    }
    function timer() {

        var mytimerId1 = setInterval(function () {
            
            mysec += 1;
            //alert(mysec)
            $("#localClock").html(myminute + ":" + mysec);
            if (mysec >=59) {
                mysec = -1;
            }
          
        }, 1000); //1000ms. = 1sec  

        var mytimerId2 = setInterval(function () {

            myminute += 1;
            $("#localClock").html(myminute + ":" + mysec);

        }, 60000);

        $("#light-pagination").click(function () {

            mysec = 0;
            myminute = 0;
            clearInterval(mytimerId2);
            mytimerId2 = setInterval(function () {

                myminute += 1;
                $("#localClock").html(myminute + ":" + mysec);

            }, 60000);
       
         
        });
    
        $("#finish").on("vclick", function () {

            stopminLocal = myminute;
            stopsecLocal = mysec;     
            $("#localClock").html(stopminLocal + ":" + stopsecLocal);
            clearInterval(mytimerId1);
            clearInterval(mytimerId2);
            count++;
            countGlobal++;
            countModeLocal = 1;

        });
        $("#ulMenuItem").on("click", ".has-sub", function (event) {

            mysec = 0;
            myminute = 0;
         
            if (count != 0) {
                timer();
                count = 0;
                countModeLocal = 0;
            }
        });

        $(".form-button").click(function () {        
            mysec = 0;
            myminute = 0;
            if (countModeLocal == 1) {
                timer();
                count = 0;
                countModeLocal = 0;
            }
        });

    }
    function timerGlobal() {

        var mytimerglobalId1 = setInterval(function () {

            mysecGlobal += 1;
            $("#globalClock").html(myminuteGlobal + ":" + mysecGlobal);
            if (mysecGlobal >58) {
                mysecGlobal = -1;
            }
        }, 1000); //1000ms. = 1sec  

        var mytimerGlobalId2 = setInterval(function () {

            myminuteGlobal += 1;
            $("#globalClock").html(myminuteGlobal + ":" + mysecGlobal);
        }, 60000);

        $("#finish").on("vclick", function () {
           
            stopmin = myminuteGlobal;
            stopsec = mysecGlobal;
            menus = $("#ulMenuItem .active a span").html();
            $("#globalClock").html(stopmin + ":" + stopsec);
            clearInterval(mytimerglobalId1); 
            clearInterval(mytimerGlobalId2);        
            $("#globalholder").html("GlobalValue[" + menus + "]=" + stopmin + ":" + stopsec);
            countMode = 1;

        });
        $("#ulMenuItem").on("click", ".has-sub", function (event) {

            mysecGlobal = 0;
            myminuteGlobal = 0;
            
            if (countGlobal != 0) {
                timerGlobal();
                countGlobal = 0;
                countMode = 0;
            }
           

        });
        $(".form-button").click(function () {

            mysecGlobal = 0;
            myminuteGlobal = 0;
          
            if (countMode == 1) {
                timerGlobal();
                countGlobal = 0;            
                countMode = 0;
            }
        });

    }

    // for ui-radio buttons to be in a single line in tablet
    $(document).ready(function () {
        $(".radiobtn").parent().addClass("ui-radio_buttons");
    });

function setToday(targetId, targetCheck) {
    var dateInput = document.getElementById(targetId);
    var targetCheck = document.getElementById(targetCheck); 

    if (dateInput) {
            // Check if the checkbox is checked
        if (targetCheck.checked) {
                // Set the date input value to today's date
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
                var yyyy = today.getFullYear();

                var todayString = yyyy + '-' + mm + '-' + dd;
                dateInput.value = todayString;
            } else {
                // If the checkbox is unchecked, clear the date input
                dateInput.value = '';
            }
        }
}
function toggleVisibility(targetId, targetCheck) {
    var checkbox = document.getElementById(targetCheck);
    var numberInput = document.getElementById(targetId);

    // Show or hide the number input based on the checkbox status
    numberInput.classList.toggle('hidden', !checkbox.checked);
}

function calculateDays(date1, date2) {
    // Convert date strings to Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    console.log(startDate + endDate)
    console.log(startDate.getTime() + endDate.getTime())

    // Check if the conversion was successful
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error('Invalid date strings');
    return 0;
    }

    // Calculate the time difference in milliseconds
    var timeDifference = (endDate.getTime() - startDate.getTime());
    if(timeDifference<1){
    console.error('Invalid date')
    return -1;
    }

    // Convert the time difference to days
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Display the result
    return daysDifference;
}
function countMondays(startDateStr, endDateStr) {
    // Convert date strings to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Initialize count
    let mondayCount = 0;

    // Iterate through the dates
    let currentDate = startDate;
    while (currentDate <= endDate) {
        // Check if the current day is Monday (day of the week is 1 in JavaScript, where Sunday is 0)
        if (currentDate.getDay() === 1) {
        mondayCount++;
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return mondayCount;
}
function getCheckedCheckboxValue(checkboxID) {
    // Select the checkbox using its ID
    const query = '#'
    let thestring = query.concat(checkboxID)
    const checkbox = document.querySelector(thestring);

    // Check if the checkbox is checked
    if (!checkbox.checked) {
    // Retrieve and log the value if checked
    const checkboxValue = checkbox.value;
    return false;
    } else {
    return true;
    }
}

function updateResults() {
    var balance1 = parseFloat(document.getElementById('currency1').value);  //int
    var balance2 = parseFloat(document.getElementById('currency2').value);  //int
    var date1 = document.getElementById('dateInput1').value;    //date string
    var date2 = document.getElementById('enddate').value;       //date string
    var card = document.getElementById('daysleft').value;       //int
    var daysbet = calculateDays(date1, date2);                  //int
    
    var dailym=0;
    var weeklym=0;
    var annim=0;
    var cardm=0;
    var finalBalance = 0;                                       //final int

    // Ensure that the input values are valid numbers
    if(daysbet < 0){
        document.getElementById('days').innerHTML = `Days: Invalid Date`;
    }
    else{document.getElementById('days').innerHTML = `Days: ${daysbet}`;}
    
    if(getCheckedCheckboxValue('daily')==true){
        dailym=daysbet*100;
        
    }
    if(getCheckedCheckboxValue('weekly')==true){
        var temp = Math.round(daysbet/7);
        weeklym=temp*500;
    }
    if(getCheckedCheckboxValue('anni')==true){
        var mondays = countMondays(date1, date2)
        annim=mondays*1800;
    }
    if(getCheckedCheckboxValue('card')==true){
        if(card>daysbet){
            cardm=daysbet*200;
        }
        else{
            cardm=card*200;
        }
    }
    if(getCheckedCheckboxValue('card')==false){
        card=0;
        cardm=0;
    }
    finalBalance = dailym+weeklym+annim+cardm+balance1;
    document.getElementById('dailies').innerHTML = `Orundum from Dailies:${dailym}`;
    document.getElementById('weeklies').innerHTML = `Orundum from Wekklies:${weeklym}`;
    document.getElementById('annis').innerHTML = `Orundum from Annihilations:${annim}`;
    document.getElementById('cards').innerHTML = `Orundum from Monthly Card:${cardm}`;
    document.getElementById('finalBal').innerHTML = `Estimated Final Balance: ${finalBalance}`;
}

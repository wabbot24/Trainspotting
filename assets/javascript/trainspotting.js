$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCWdv7d9qVUYGNVSReZXFfhqjKrORTWDqw",
        authDomain: "trainspotting-f6d27.firebaseapp.com",
        databaseURL: "https://trainspotting-f6d27.firebaseio.com",
        projectId: "trainspotting-f6d27",
        storageBucket: "trainspotting-f6d27.appspot.com",
        messagingSenderId: "356376933692"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit-button").on("click", (event) => {
        event.preventDefault();

        var train = $("#train-name").val();
        var destination = $("#destination").val();
        var frequency = $("#frequency").val();       
        var firstTime = $("#train-start").val();

        // var newTrain = {
        //     train: train,
        //     destination: destination,
        //     frequency: frequency,
        //     firstTime: firstTime
        // }
    
        // database.ref().push(newTrain);

        // First Time (pushed back 1 year to make sure it comes before current time)
        // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);
    
        // // Current Time
        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // // Difference between the times
        // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // // Time apart (remainder)
        // var tRemainder = diffTime % frequency;
        // console.log(tRemainder);
    
        // // Minute Until Train
        // var minutesAway = frequency - tRemainder;
    
        // // Next Train
        // var nextTrain = moment().add(minutesAway, "minutes");
        // var nextArrival = moment(nextTrain).format("hh:mm");

        

        
        
        
        // var row = $("<tr>");

        // $(row).append(` <td> ${train}</td>`);
        // $(row).append(` <td> ${destination}</td>`);
        // $(row).append(` <td> ${frequency}</td>`);
        // $(row).append(` <td> ${nextArrival}</td>`);
        // $(row).append(` <td> ${minutesAway}</td>`);


        // $("tbody").append(row);

        //set info to firebase
        database.ref().push({
            train,
            destination,
            frequency,
            firstTime
        });

        $("#train-name").val("");
        $("#destination").val("");
        $("#frequency").val("");       
        $("#train-start").val("");
    });

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());
        var sv = snapshot.val();

        var trainDB = snapshot.val().train;
        var destinationDB = snapshot.val().destination;
        var frequencyDB = snapshot.val().frequency;
        var firstTimeString = snapshot.val().firstTime;

        var firstTime = parseInt(firstTimeString);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % frequencyDB;
        console.log(tRemainder);
    
        // Minute Until Train
        var minutesAway = frequencyDB - tRemainder;
    
        // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        var nextArrival = moment(nextTrain).format("hh:mm");

        console.log(trainDB);
        console.log(destinationDB);
        console.log(frequencyDB);
        console.log(nextArrival);
        console.log(minutesAway);


        var row = $("<tr>");

        $(row).append(` <td> ${trainDB}</td>`);
        $(row).append(` <td> ${destinationDB}</td>`);
        $(row).append(` <td> ${frequencyDB} min </td>`);
        $(row).append(` <td> ${nextArrival}</td>`);
        $(row).append(` <td> ${minutesAway}</td>`);

        $("tbody").append(row);


    });




});
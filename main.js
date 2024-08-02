#! /usr/bin/env node
import inquirer from "inquirer"; // // For user prompts
import chalk from "chalk"; // for Styling text
import { addSeconds, differenceInSeconds } from "date-fns"; // for date manipulations
console.log(chalk.bold.greenBright("------------------------------------------------- CountDown Timer ------------------------------------------------- "));
// function to prompt user to enter time in seconds
async function getUserTime() {
    const userTime = await inquirer.prompt({
        name: "userEnterTime",
        message: chalk.bold.yellowBright("Enter the time (in seconds) you want the timer to start:"),
        type: "number"
    });
    return userTime.userEnterTime;
}
// function to run the countDown Timer
async function runCountDownTimer() {
    const userInput = await getUserTime(); // getting user input for time
    // validating user input
    if (isNaN(userInput) || userInput <= 0) {
        console.log(chalk.redBright("Please Enter a valid number is greter than 0."));
        return;
    }
    // getting current time
    const startTime = new Date(); // The current time when the timer starts.
    const endTime = addSeconds(startTime, userInput); //  Calculated by adding the user-specified seconds to the start time using 
    // console.log(endTime);
    // Timer Interval
    const interval = setInterval(() => {
        const currentTime = new Date();
        const remainingTime = differenceInSeconds(endTime, currentTime);
        // Checking remaining time and displaying accordingly
        if (remainingTime > 0) {
            const min = Math.floor((remainingTime % 3600 / 60)); // formula for minutes within an hour
            const sec = Math.floor(remainingTime % 60); // Seconds
            console.log(chalk.blueBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }
        else {
            clearInterval(interval);
            console.log(chalk.greenBright("Time Finished!"));
        }
    }, 1000);
}
;
// running the countDown timer function    
runCountDownTimer();
// and we have made count down timer

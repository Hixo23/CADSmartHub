// backend/middleware/launchCADSoftware.js
const { exec } = require('child_process');

// Path to the CADSoftware executable
const CADSoftwarePath = '"C:\\Program Files\\Dassault Systemes\\DraftSight\\bin\\DraftSight.exe"'; // Adjust the path as necessary

// Function to check if CAD software is running
function isCADSoftwareRunning() {
    return new Promise((resolve, reject) => {
        exec('tasklist', (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            // Check if DraftSight.exe is in the list of running processes
            const isRunning = stdout.toLowerCase().includes('draftsight.exe');
            resolve(isRunning);
        });
    });
}

// Function to launch CADSoftware
async function launchCADSoftware() {
    console.log(`Within function launchCADSoftware`);

    // Check if the CAD software is already running
    const running = await isCADSoftwareRunning();
    if (running) {
        console.log('DraftSight is already running.');
        return; // Exit the function if it's already running
    }

    // Launch the CAD software
    exec(CADSoftwarePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching CADSoftware: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`CADSoftware launched: ${stdout}`);
    });
}

// Export the function
module.exports = launchCADSoftware;

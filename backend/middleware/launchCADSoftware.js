// backend/middleware/launchCADSoftware.js
const { exec } = require('child_process');

// Path to the CADSoftware executable
const CADSoftwarePath = '"C:\\Program Files\\Dassault Systemes\\DraftSight\\bin\\DraftSight.exe"'; // Adjust the path as necessary

// Function to launch CADSoftware
function launchCADSoftware() {
    console.log(`Within function launchCADSoftware`);
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

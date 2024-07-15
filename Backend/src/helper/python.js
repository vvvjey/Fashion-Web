const { spawn } = require('node:child_process');
function runPythonScript() {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ["./src/helper/popularityProdRecom.py"]);
  
      let data = '';
      let error = '';
  
      pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
      });
  
      pythonProcess.stderr.on('data', (chunk) => {
        error += chunk.toString();
      });
  
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}: ${error}`));
        } else {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        }
      });
    });
  }


module.exports={
    runPythonScript
}
document.addEventListener("DOMContentLoaded", function () {
    // Your code here
    const token = "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";
    const inputTxt = document.getElementById("input");
    const image = document.getElementById("image");
    const button = document.getElementById("btn");
  
    image.style.display = 'none'; // Initially hide the image box
  
    async function query() {
      image.src = "/loading.gif"; // Set loading gif while generating
      const response = await fetch("https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.1", {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: inputTxt.value, // Send only the input text as a string
      });
  
      const result = await response.blob();
      return result;
    }
  
    button.addEventListener('click', async function() {
      query().then((response) => {
        console.log(response);
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        image.style.display = 'block'; // Display the image after generation
        response.text().then(text => {
          console.log(text); // Log the response body
        }).catch(error => {
          console.error('Error reading response:', error);
        });
      });
    });
  });
  ;
  
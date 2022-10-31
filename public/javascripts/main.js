//
// Please read scanner.js developer's guide at: http://asprise.com/document-scan-upload-image-browser/ie-chrome-firefox-scanner-docs.html
//

/** Initiates a scan */

let displayImagesOnPage=function (successful, mesg, response) {
    if (!successful) {
      // On error
      console.error('Failed: ' + mesg);
      alert(`mesg ===>${mesg}`)
      alert(`response ===>${response}`)
      return;
    }
  
    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf('user cancel') >= 0
    ) {
      // User cancelled.
      console.info('User cancelled');
      return;
    }
  
    var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    for (
      var i = 0;
      scannedImages instanceof Array && i < scannedImages.length;
      i++
    ) {
      var scannedImage = scannedImages[i];
      processScannedImage(scannedImage);
    }
  }

$('#btn-scan').click(function (e) { 
    e.preventDefault();
    scanner.scan(displayImagesOnPage, {
        output_settings: [
          {
            type: 'return-base64',
            format: 'jpg',
          },
        ],
      });
    
});





var imagesScanned = [];

/** Processes a ScannedImage */
function processScannedImage(scannedImage) {
  imagesScanned.push(scannedImage);
  var elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  document.getElementById('images').appendChild(elementImg);
}

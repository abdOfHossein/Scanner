//
// Please read scanner.js developer's guide at: http://asprise.com/document-scan-upload-image-browser/ie-chrome-firefox-scanner-docs.html
//

/** Initiates a scan */

let displayImagesOnPage = function (successful, mesg, response) {
  if (!successful) {
    // On error
    console.error('Failed: ' + mesg);
    alert(`mesg ===>${mesg}`);
    alert(`response ===>${response}`);
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
  console.log('response', response);
  var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
  for (
    var i = 0;
    scannedImages instanceof Array && i < scannedImages.length;
    i++
  ) {
    var scannedImage = scannedImages[i];
    processScannedImage(scannedImage);
  }
};

let imagesScanned = [];
/** Processes a ScannedImage */
let processScannedImage = function (scannedImage) {
  imagesScanned.push(scannedImage);
  console.log('scannedImage', scannedImage);
  var elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  document.getElementById('images').appendChild(elementImg);
  // $('#file').
};

//doing scan
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

//==================================
$('#btn-save-db').click(function (e) {
  e.preventDefault();

  submitFormWithScannedImages();
});

function submitFormWithScannedImages() {
  if (
    scanner.submitFormWithImages('form-save-db', imagesScanned, function (xhr) {
      if (xhr.readyState == 4) {
        console.log(xhr);
        // 4: request finished and response is ready
        document.getElementById('server_response').innerHTML =
          '<h2>Response from the server: </h2>' + xhr.responseText;
        document.getElementById('images').innerHTML = ''; // clear images
        imagesScanned = [];
      }
    })
  ) {
    document.getElementById('server_response').innerHTML =
      'Submitting, please stand by ...';
  } else {
    document.getElementById('server_response').innerHTML =
      'Form submission cancelled. Please scan first.';
  }
}

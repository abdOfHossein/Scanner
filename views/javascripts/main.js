// ======>JPG
let displayImagesOnPage = function (successful, mesg, response) {
  if (!successful) {
    // On error
    console.error('Failed: ' + mesg);
    alert('Failed: ' + mesg);
    return;
  }

  if (
    successful &&
    mesg != null &&
    mesg.toLowerCase().indexOf('user cancel') >= 0
  ) {
    // User cancelled.
    console.info('User cancelled');
    alert('User cancelled');
    return;
  }

  let scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
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

/** function of Processes a ScannedImage */
let processScannedImage = function (scannedImage) {
  imagesScanned.push(scannedImage);
  var elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  document.getElementById('images').appendChild(elementImg);
};

// function of send Files to Server with From
let submitFormWithScannedImages = function () {
  scanner.submitFormWithImages('form1', imagesScanned, function (xhr) {
    if (xhr.readyState == 4) {
      // 4: request finished and response is ready
      document.getElementById('images').innerHTML = ''; // clear images
      imagesScanned = [];
      alert('succuss');
      return;
    }
    // alert(`err of send File : ${xhr.mesg}`);
  });
};

let scanConfig = {
  twain_cap_setting: {
    ICAP_PIXELTYPE: 'TWPT_RGB,TWPT_GRAY', // Color
    ICAP_XRESOLUTION: '100', // DPI: 100
    ICAP_YRESOLUTION: '100',
    ICAP_SUPPORTEDSIZES: 'TWSS_A4', // Paper size: TWSS_USLETTER, TWSS_A4, ...
  },
  output_settings: [
    {
      type: 'return-base64',
      // ICAP_XRESOLUTION: '100', // DPI: 100
      // ICAP_YRESOLUTION: '100',
      // type: 'save',
      format: 'jpg',
      // save_path:
      //   'C:\\Users\\Hampa\\Desktop\\repository\\Scanner-Project\\Scanner-Project\\storage\\${TMS}${EXT}',
    },
  ],
};

$('#btn-scan-jpg').click(function (e) {
  e.preventDefault();
  scanner.scan(displayImagesOnPage, scanConfig);
});

$('#btn-submit-jpg').click(function (e) {
  e.preventDefault();
  submitFormWithScannedImages();
});

//===============================
// ====> PDF

// function scanToPdfWithThumbnails() {
//   scanner.scan(displayImagesOnPage,
//           {
//               "output_settings": [
//                   {
//                       "type": "return-base64",
//                       "format": "pdf",
//                       "pdf_text_line": "By ${USERNAME} on ${DATETIME}"
//                   },
//                   {
//                       "type": "return-base64-thumbnail",
//                       "format": "jpg",
//                       "thumbnail_height": 200
//                   }
//               ]
//           }
//   );
// }

// /** Processes the scan result */
// function displayImagesOnPage(successful, mesg, response) {
//   if(!successful) { // On error
//       console.error('Failed: ' + mesg);
//       return;
//   }

//   if(successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
//       console.info('User cancelled');
//       return;
//   }

//   var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
//   for(var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
//       var scannedImage = scannedImages[i];
//       processOriginal(scannedImage);
//   }

//   var thumbnails = scanner.getScannedImages(response, false, true); // returns an array of ScannedImage
//   for(var i = 0; (thumbnails instanceof Array) && i < thumbnails.length; i++) {
//       var thumbnail = thumbnails[i];
//       processThumbnail(thumbnail);
//   }
// }

// /** Images scanned so far. */
// var imagesScanned2 = [];

// /** Processes an original */
// function processOriginal(scannedImage) {
//   imagesScanned2.push(scannedImage);
// }

// /** Processes a thumbnail */
// function processThumbnail(scannedImage) {
//   var elementImg = scanner.createDomElementFromModel( {
//       'name': 'img',
//       'attributes': {
//           'class': 'scanned',
//           'src': scannedImage.src
//       }
//   });
//   document.getElementById('images').appendChild(elementImg);
// }

// /** Upload scanned images by submitting the form */
// function submitFormWithScannedImages() {
//   if (scanner.submitFormWithImages('form1', imagesScanned, function (xhr) {
//       if (xhr.readyState == 4) { // 4: request finished and response is ready
//           document.getElementById('server_response').innerHTML = "<h2>Response from the server: </h2>" + xhr.responseText;
//           document.getElementById('images').innerHTML = ''; // clear images
//           imagesScanned = [];
//       }
//   })) {
//       document.getElementById('server_response').innerHTML = "Submitting, please stand by ...";
//   } else {
//       document.getElementById('server_response').innerHTML = "Form submission cancelled. Please scan first.";
//   }
// }

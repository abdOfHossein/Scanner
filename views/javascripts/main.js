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

  // let thumbnails = scanner.getScannedImages(response, false, true); // returns an array of ScannedImage
  // for (var i = 0; thumbnails instanceof Array && i < thumbnails.length; i++) {
  //   var thumbnail = thumbnails[i];
  //   alert('hi');
  //   processThumbnail(thumbnail);
  // }
  // alert('goodby');

  if (response.includes('pdf')) {
  var thumbnails = scanner.getScannedImages(response, false, true); // returns an array of ScannedImage
  for (var i = 0; thumbnails instanceof Array && i < thumbnails.length; i++) {
    var thumbnail = thumbnails[i];
    alert('hi');
    processThumbnail(thumbnail);
  }
  
  } else {
    let scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    for (
      var i = 0;
      scannedImages instanceof Array && i < scannedImages.length;
      i++
    ) {
      var scannedImage = scannedImages[i];
      processScannedImage(scannedImage);
    }
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
  scanner.submitFormWithImages('form-image', imagesScanned, function (xhr) {
    if (xhr.readyState == 4) {
      // 4: request finished and response is ready
      document.getElementById('images').innerHTML = ''; // clear images
      imagesScanned = [];
      alert('succuss');
      return;
    }

    scanner.submitFormWithImages('form-pdf', imagesScanned, function (xhr) {
      if (xhr.readyState == 4) {
        // 4: request finished and response is ready
        document.getElementById('pdf').innerHTML = ''; // clear images
        imagesScanned = [];
        alert('success');
      }
    });
  });
};

let scanImgConfig = {
  output_settings: [
    {
      type: 'return-base64',
      format: 'jpg',
    },
    {
      type: 'save',
      format: 'jpg',
      save_path:
        'C:\\Users\\Hampa\\Desktop\\repository\\Scanner-Project\\Scanner-Project\\storage\\${TMS}${EXT}',
    },
  ],
};

$('#btn-scan-jpg').click(function (e) {
  e.preventDefault();
  scanner.scan(displayImagesOnPage, scanImgConfig);
});

$('#btn-submit-jpg').click(function (e) {
  e.preventDefault();
  submitFormWithScannedImages();
});

//==============================================================================

/** Processes the scan result */
// let displayImagesOnPage = function (successful, mesg, response) {
//   if (!successful) {
//     // On error
//     console.error('Failed: ' + mesg);
//     alert('Failed: ' + mesg);
//     return;
//   }

//   if (
//     successful &&
//     mesg != null &&
//     mesg.toLowerCase().indexOf('user cancel') >= 0
//   ) {
//     // User cancelled.
//     console.info('User cancelled');
//     return;
//   }

//   // var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
//   // for (
//   //   var i = 0;
//   //   scannedImages instanceof Array && i < scannedImages.length;
//   //   i++
//   // ) {
//   //   var scannedImage = scannedImages[i];
//   //   processOriginal(scannedImage);
//   // }

//   var thumbnails = scanner.getScannedImages(response, false, true); // returns an array of ScannedImage
//   for (var i = 0; thumbnails instanceof Array && i < thumbnails.length; i++) {
//     var thumbnail = thumbnails[i];
//     alert('hi');
//     processThumbnail(thumbnail);
//   }
//   alert('goodby');
// };

let scanPdfConfig = {
  output_settings: [
    {
      type: 'return-base64',
      format: 'jpg',
      // pdf_text_line: 'By ${USERNAME} on ${DATETIME}',
    },
    {
      type: 'save',
      // type: 'save',
      format: 'pdf',
      save_path:
        'C:\\Users\\Hampa\\Desktop\\repository\\Scanner-Project\\Scanner-Project\\storage\\${TMS}${EXT}',
    },
  ],
};

/** Images scanned so far. */
var imagesScanned2 = [];

/** Processes an original */
function processOriginal(scannedImage) {
  imagesScanned2.push(scannedImage);
}

/** Processes a thumbnail */
let processThumbnail = function (scannedImage) {
  alert('hi');
  var elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  document.getElementById('pdf').appendChild(elementImg);
};

/** Upload scanned images by submitting the form */
// let submitFormWithScannedImages = function () {
//   scanner.submitFormWithImages('form-pdf', imagesScanned, function (xhr) {
//     if (xhr.readyState == 4) {
//       // 4: request finished and response is ready
//       document.getElementById('pdf').innerHTML = ''; // clear images
//       imagesScanned = [];
//       alert('success');
//     }
//   });
// };

$('#btn-scan-pdf').click(function (e) {
  e.preventDefault();
  alert('hi');
  scanner.scan(displayImagesOnPage, scanPdfConfig);
});

$('#btn-submit-pdf').click(function (e) {
  e.preventDefault();
  submitFormWithScannedImages();
});

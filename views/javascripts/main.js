// below Function doing Scan Operation
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

  if (response.includes('pdf')) {
    let scannedImages = scanner.getScannedImages(response, true, false, true); // returns an array of ScannedImage
    for (
      let i = 0;
      scannedImages instanceof Array && i < scannedImages.length;
      i++
    ) {
      let scannedImage = scannedImages[i];
      processOriginal(scannedImage);
    }

    let thumbnails = scanner.getScannedImages(response, false, true, false); // returns an array of ScannedImage
    for (let i = 0; thumbnails instanceof Array && i < thumbnails.length; i++) {
      let thumbnail = thumbnails[i];
      processThumbnail(thumbnail);
    }
  } else {
    let scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    for (
      let i = 0;
      scannedImages instanceof Array && i < scannedImages.length;
      i++
    ) {
      let scannedImage = scannedImages[i];
      processScannedImage(scannedImage);
    }
  }
};

//Below we have Functions That Doing Proceess of Shoing Image on Browser

//for jpg
let imagesScannedJpg = [];
let processScannedImage = function (scannedImage) {
  imagesScannedJpg.push(scannedImage);
  let elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  $('#images').append(elementImg);
};
//for pdf
let processThumbnail = function (scannedImage) {
  let elementImg = scanner.createDomElementFromModel({
    name: 'img',
    attributes: {
      class: 'scanned',
      src: scannedImage.src,
    },
  });
  $('#pdf').append(elementImg);
};
let imagesScannedPdf = [];
let processOriginal = function (scannedImage) {
  imagesScannedPdf.push(scannedImage);
};

// Below we have two functions that Doing Submit Files Operation With Form

//for Jpg
let submitFormWithScannedJpg = function () {
  scanner.submitFormWithImages('form-image', imagesScannedJpg, function (xhr) {
    if (xhr.readyState == 4) {
      // 4: request finished and response is ready
      $('#images').html(''); // clear images
      imagesScannedJpg = [];
      alert('succuss');
      return;
    }
  });
};
//for pdf
let submitFormWithScannedPdf = function () {
  scanner.submitFormWithImages('form-pdf', imagesScannedPdf, function (xhr) {
    if (xhr.readyState == 4) {
      // 4: request finished and response is ready
      $('#pdf').html(''); // clear images
      imagesScannedPdf = [];
      alert('success');
    }
  });
};

// Below we Configs File that we Fixed Output Setting

//jpg config
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
        'C:\\Users\\Hampa\\Desktop\\repository\\Scanner-Project\\storage\\${TMS}${EXT}',
    },
  ],
};

//pdf config
let scanPdfConfig = {
  output_settings: [
    {
      type: 'return-base64',
      format: 'pdf',
    },
    {
      type: 'return-base64-thumbnail',
      format: 'jpg',
    },
    {
      type: 'save',
      format: 'pdf',
      save_path:
    "C:\\Users\\Hampa\\Desktop\\repository\\Scanner-Project\\storage\\${TMS}${EXT}"
    },
  ],
};

//Below we have Functions That Doing Dom Operation

$('#btn-scan-jpg').click(function (e) {
  e.preventDefault();
  scanner.scan(displayImagesOnPage, scanImgConfig);
});

$('#btn-submit-jpg').click(function (e) {
  e.preventDefault();
  submitFormWithScannedJpg();
});

$('#btn-scan-pdf').click(function (e) {
  e.preventDefault();
  scanner.scan(displayImagesOnPage, scanPdfConfig);
});

$('#btn-submit-pdf').click(function (e) {
  e.preventDefault();
  submitFormWithScannedPdf();
});

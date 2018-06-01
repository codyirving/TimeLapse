const output = document.getElementById("output");
let file = null;
let fileArray = {
  inputArray: ["empty"],
  addArray: function(incomingArray) {
    console.log("Addarray: " + isArray(incomingArray));
    this.inputArray = incomingArray;
    return this;
  },
  filterForImages: function() {
    console.log("filter: " + isArray(this.inputArray));
    this.inputArray = this.inputArray.filter(isImage);
    return this;
  },
  makeObjectURL: function() {
    if (this.length > 0) {
      return URL.createObjectURL(file);
    }
  }
};
function isArray(myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1;
}

// - EDIT - //
// Paste your own ID's here //
const albumHash = "Rnhq5VzyKXZ0yWu";
const clientId = "b131c17cf8131dd";
const albumId = "JbYV9";

function isImage(image) {
  return image.type.match(/^image\//);
}
function filterForImages(fileList) {
  //get files that are images
  console.log(
    "dosomething: " + fileList.length + " isArray:" + isArray(fileList)
  );

  return fileList.filter(isImage);
}
File.prototype.makeObjectURL = function() {
  console.log("prototype: " + this + " URL: " + URL.createObjectURL(this));
  if (this.length > 0) {
    return URL.createObjectURL(this);
  }
};

function doSomethingWithImage(inputFile) {
  //assume inputFileArray is FileList

  //var filteredArray = inputFileArray.filter(isImage);

  console.log("inputfile.type:" + inputFile.type);

  if (!inputFile.type.match(/^image\//)) {
    alert("Sorry, please choose a valid image file.");
    return null;
  }

  file = inputFile;
  output.src = inputFile.makeObjectURL();
  console.log("OUTPUT SRC: " + output.src);

  var form = new FormData();
  form.append("image", file);
  form.append("album", albumHash);

  //IMGUR UPLOAD
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.imgur.com/3/image",
    method: "POST",
    headers: {
      Authorization: `Client-ID ${clientId}`
    },
    processData: false,
    contentType: false,
    mimeType: "multipart/form-data",
    data: form
  };

  $.ajax(settings).done(function(response) {
    const responseObject = JSON.parse(response);
    //console.log("responsObject data.link: " + responseObject.data.link);
    $(".link").attr("href", responseObject.data.link);
    $(".link").html(responseObject.data.link);
    //setting title to delete hash enables persistance workaround
    setTitle(responseObject.data.deletehash);
  });
}
//SET Title of IMGUR image
function setTitle(title) {
  //title should be deletehash
  let form = new FormData();
  form.append("title", title);
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://api.imgur.com/3/image/${title}`,
    method: "POST",
    headers: {
      Authorization: `Client-ID ${clientId}`
    },
    processData: false,
    contentType: false,
    mimeType: "multipart/form-data",
    data: form
  };
  $.ajax(settings).done(function(response) {
    //console.log(response);
  });
}

function removePic(deleteHash) {
  let confirmation = confirm("Delete Picture? This cannot be undone.");
  if (confirmation) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://api.imgur.com/3/image/${deleteHash}`,
      method: "DELETE",
      headers: {
        Authorization: `Client-ID ${clientId}`
      }
    };

    $.ajax(settings).done(function(response) {
      alert("Success!");
      //console.log(response);
    });
  }
}

//GET ALBUM AND DISPLAY IMAGES

var settings = {
  async: true,
  crossDomain: true,
  url: `https://api.imgur.com/3/album/${albumId}/images`,
  method: "GET",
  headers: {
    Authorization: `Client-ID ${clientId}`
  }
};

let gifArray = [];

let anigif = $.ajax(settings).done(function(response) {
  let albumImages = response.data;
  let count = 0;
  albumImages.forEach(element => {
    let imageLink = element.link;
    //alter IMGUR link to present medium size jpg
    imageLink = imageLink.replace(".jpg", "m.jpg");
    gifArray.push(imageLink);
    $(".thumbs").append(
      `<div class='col-3'><a href='${imageLink}'><img src='${imageLink}' alt='image ${++count}'></a><br><a class="delete-link"  aria-label="Delete Button" href=javascript:removePic('${
        element.title
      }')>DELETE</a></div>`
    );
  });
  //TURN ARRAY INTO ANIMATED GIF
  gifshot.createGIF(
    {
      images: gifArray
    },
    function(obj) {
      if (!obj.error || true) {
        var image = obj.image;
        var gifOutput = document.getElementById("output");
        gifOutput.src = image;
        // runFF();
      }
    }
  );
});

//FILEPICKER
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", e =>
  doSomethingWithImage(e.target.files[0])
);

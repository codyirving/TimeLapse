const output = document.getElementById("output");
let file = null;


const albumHash = "Rnhq5VzyKXZ0yWu";
const clientId = "b131c17cf8131dd";
const albumId = "JbYV9";

//FILEPICKER and IMGUR UPLOAD
function doSomethingWithFiles(fileList) {
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].type.match(/^image\//)) {
      file = fileList[i];
      break;
    }
  }
  if (file !== null) {
    output.src = URL.createObjectURL(file);
  }


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

$.ajax(settings).done(function(response) {
  let albumImages = response.data;
  let count = 0;
  albumImages.forEach(element => {
    let imageLink = element.link;
    //alter IMGUR link to present medium size jpg
    imageLink = imageLink.replace(".jpg","m.jpg");
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
//FREEZEFRAME Library
async function runFF() {
    $('#output').freezeframe();
//     await sleep(3000);

//    var third = new freezeframe("#output").capture().setup();


//    $('#output').mouseenter(third.release()).mouseleave(third.trigger());
  
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two second later');
  }



//FILEPICKER 
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", e => doSomethingWithFiles(e.target.files));

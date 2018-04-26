# TimeLapse GifMaker 3000

Quickly and easily create animated gifs with your phone's camera, or upload on desktop.

## Getting Started

Create an IMGUR account if you do not have one and copy your Client ID. (See developer tools below)

Use Postman and Client ID to retrieve album ID and album deletehash. (See developer tools below)

Copy files to your host.

Paste in your IMGUR Client ID, Album ID and Albumhash/Deletehash into index.js section marked // - EDIT - //.

Save files.

Naviate to index.html and have fun!

### Installing

A step by step series of examples that tell you have to get a development env running

Copy all source files to host directory.

Edit index.js and add your IMGUR ie:

```
const albumHash = "UsmMMlT45mNML8U";
const clientId = "b131c37cf8131ed";
const albumId = "2bWuahp";
```

Navigate to index.html

## Developer tools

IMGUR account needed to access Client ID and create albums.

Postman is recommended to use the IMGUR API to create new albums and view JSON responses to retrieve ID and albumhash.

## Built With

* [gifshot](https://github.com/yahoo/gifshot) - The animated gif library used
* [jQuery](https://github.com/jquery/jquery) - JavaScript Library

## Authors

* **Cody Irving** - *Initial work* 

See also the list of [contributors](https://github.com/codyirving/TimeLapse/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

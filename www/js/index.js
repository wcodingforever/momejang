/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() { document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() { this.receivedEvent('deviceready'); },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
};

app.initialize();

var pictureSource;   // picture source
//var destinationType; // sets the format of returned value 

// Wait for Cordova to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used!
function onDeviceReady() {
//    pictureSource=navigator.camera.PictureSourceType;
//    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
    // console.log(imageData);

    // Get image handle
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
    //smallImage.src = imageData;

    //movePic(imageData);
}

// Called when a photo is successfully retrieved
// function onPhotoURISuccess(imageURI) {
//     // console.log(imageURI);

//     // Get image handle
//     var largeImage = document.getElementById('largeImage');

//     // Unhide image elements
//     largeImage.style.display = 'block';

//     // Show the captured photo
//     // The inline CSS rules are used to resize the image
//     largeImage.src = imageURI;
// }

// A button will call this function
function capturePhoto() {
    navigator.camera.DestinationType = Camera.DestinationType.FILE_URI;
    console.log("Destination Type: " + navigator.camera.DestinationType);
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        //destinationType: destinationType.DATA_URL,
        //destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        // allowEdit: false,
        // encodingType: Camera.EncodingType.JPEG,
        // mediaType: Camera.MediaType.PICTURE,
        // popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        //correctOrientation: true
    });
}

// A button will call this function
// function capturePhotoEdit() {
//     // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
//     navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
//     destinationType: destinationType.DATA_URL });
// }

// A button will call this function
// function getPhoto(source) {
//     // Retrieve image file location from specified source
//     navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
//     destinationType: destinationType.FILE_URI,
//     sourceType: source });
// }

function onFail(message) { alert('getPicture failed because: ' + message); }

function movePic(file){ 
    window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "MomeChang";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
        //The folder is created if doesn't exist
        fileSys.root.getDirectory(
            myFolderApp,
            { create:true, exclusive: false },
            function(directory) {
                entry.moveTo(directory, newFileName,  successMove, resOnError);
            },
            resOnError
        );
    }, resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
    console.log("successMove: " + entry.toURL());
}

function resOnError(error) {
    alert("Couldn't find file: " + error.code);
}

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openCamera(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    //var func = createNewFileEntry;
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        func(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {

    var elem = document.getElementById('smallImage');
    elem.src = imgUri;
}

function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}

function onErrorResolveUrl() { console.log("onErrorResolveUrl!"); }

function onErrorCreateFile() { console.log("onErrorCreateFile!"); }

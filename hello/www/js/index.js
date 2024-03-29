/* jshint undef: true, strict:false, trailing:false, unused:false, -W110 */
/*global $,_,document,window,console,escape,Backbone,exports,WebSocket,process,_NODE_AJAX,angular,jQuery,cordova,alert */
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
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        jQuery('.controls').on('touchstart', function(x, event) { console.log('touchstart ', x.originalEvent.touches.length); });
        jQuery('.controls').on('touchend', function(x, event) { console.log('touchend ',  x.originalEvent.touches.length); });
        // jQuery('body').on('click', function(x) { console.log('click ', x); });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // FastClick.attach(document.body);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('yolo camera ');
        console.log('Received Eventzzz: ' + id);
    }
};

var takePic = function() { 
    console.log('takepic');
    if (navigator.camera) { 
        navigator.camera.getPicture(function(data)  {
           console.log('camera success!! ' + data);
           console.log('data url length ' + data.length);            
           var image = document.getElementById('photo');
           image.src = data; // "data:image/jpeg;base64," + data;
        }, function(err) { 
            console.log('camera fail ');
            console.error('error w/ getPicture >> ', err);  
        }, { 
            quality: 10, 
            destinationType: navigator.camera.DestinationType.FILE_URI
            // destinationType: navigator.camera.DestinationType.DATA_URL 
        });
    } else {
        console.error('no navigator.camera');
    }
};
var takeBarcode = function() { 
    if (!cordova.plugins.barcodeScanner) { 
        console.error('no barcode scanner');
        return;
    }
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
          jQuery('.barcode').html(result.text);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
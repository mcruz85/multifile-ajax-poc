require([
        "dojo/parser", "dojox/form/Uploader", "dojo/on", "dojo/has", 
        "dojox/form/uploader/FileList", "dojox/form/uploader/plugins/IFrame", 
        "dojo/domReady!"], 
function(parser, Uploader, on, has) {    
    parser.parse(document.getElementById("container"));
    
    var form = document.getElementById("uploader");
    
    var up = new dojox.form.Uploader({
        label: 'Select files',
        multiple: true,
        url: "/multifile-ajax-poc/UploaderServlet"
    }).placeAt(form);

    var list = new dojox.form.uploader.FileList({
        uploader: up
    }).placeAt(form);

    on (document.getElementById("uploadBtn"), "click", function(evt) {
    	up.submit();
    });  
    
    dojo.connect(up, "onComplete", function(dataArray) {
        var i = 0;
        
        if (! dataArray.error) {
        	
        	for (i = 0; i < dataArray.length; ++i) {
                alert("File ID is: " + dataArray[i].id);
        	}
        } else {
        	alert("Unable to upload the file(s)");
        }
    });    

   // btn.startup();
    up.startup();
    list.startup();    
    
    /*
    if (has('ie')) { //IE must use iframe ...
        require(["dojox/form/uploader/plugins/IFrame"], function() {
            var uploader = new dojox.form.Uploader({
                name: "uploader",
                label: "Upload Your File",
                multiple: true,
                uploadOnSelect: false,
                url: "/multifile-ajax-poc/UploaderServlet"
            },
            "uploader");
        
            uploader.startup();
            
            dojo.connect(uploader, "onComplete", function(dataArray) {
                alert("onComplete Fired!");
                
                alert("File ID is: " + dataArray.id);
                // Call other stuff ...
            });
            
            on (document.getElementById("uploadBtn"), "click", function(evt) {
                uploader.submit();
            });                                
        });
    } else {
        alert("Firefox");
    */    
        //require(["dojox/form/uploader/plugins/HTML5"], function() {
    
    /*
            var uploader = new dojox.form.Uploader({
                multiple: true,
                uploadOnSelect: false,
                class: "uploadBtn",               
                url: "/multifile-ajax-poc/UploaderServlet"
            },
            "uploader");
        
            uploader.startup();
            
            //var list = new dojox.form.uploader.FileList({uploader:uploader});
            //dojo.byId("uploader").appendChild(list.domNode);                    
            
            dojo.connect(uploader, "onComplete", function(dataArray) {
                alert("onComplete Fired!");
                var i = 0;
                
                if (! dataArray.error) {
                	
                	for (i = 0; i < dataArray.length; ++i) {
                        alert("File ID is: " + dataArray[i].id);
                	}
                } else {
                	alert("Unable to upload the file(s)");
                }
            });
            
            on (document.getElementById("uploadBtn"), "click", function(evt) {
                uploader.submit();
            });
            */                                
        //});   
    //}
            
            
            
}
);
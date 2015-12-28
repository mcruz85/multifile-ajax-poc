require([
        "dojo/parser", "dojox/form/Uploader", "dojo/dom", "dojo/on", "dojo/has", 
        "dojox/form/uploader/FileList", "dojox/form/uploader/plugins/IFrame", 
        "dojo/domReady!"], 
function(parser, Uploader, dom, on, has) {    
    parser.parse(document.getElementById("container"));
    
    var uploaderDIV = document.getElementById("uploader");
    
    var up = new dojox.form.Uploader({
        label: 'Select files',
        style : 'background-color: #ddddff; border: solid 1px;', //Externalize ...
        multiple: true,
        url: "/multifile-ajax-poc/UploaderServlet"
    }).placeAt(uploaderDIV);
    
    on (dom.byId("uploadBtn"), "click", function(evt) {
    	
    	//You can put some validations here ...
        up.submit();
    });  

    on (dom.byId("clearBtn"), "click", function(evt) {
        dom.byId("uploaderStatus").innerHTML = "";
        up.reset();
    });
    
    dojo.connect(up, "onComplete", function(dataArray) {
        var i = 0;
        
        dom.byId("uploaderStatus").innerHTML = "";
        
        if (!dataArray.error) {
            for (i = 0; i < dataArray.length; ++i) {
            	dom.byId("uploaderStatus").innerHTML += "File ID is: " + dataArray[i].id + " is uploaded" + "<br/>";
            }
        } else {
        	dom.byId("uploaderStatus").innerHTML = "Unable to upload the file(s)";
        }
    });    
    
    dojo.connect(up, "onChange", function(evt) {
        var i = 0;
        var content = "";
        var dataArray = up.getFileList();
        
        for (i = 0; i < dataArray.length; ++i) {
            content += dataArray[i].name + "<br/>";
        }
        
        dom.byId("uploaderStatus").innerHTML = content;
    });    
    
    up.startup();     
}
);
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>File Upload POC</title>
	
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo.js">
	</script>
</head>
<body>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/fileUploader.js"></script>
	<div id="container">
		<form method="post" id="myForm" enctype="multipart/form-data">
		    <fieldset>
		        <legend>Form Files Test</legend>
		        
		        <input id="clearBtn" type="button" value="Clear"></input><br/><br/>
				<div id="uploader"></div><br/>
				<div id="uploaderStatus"></div>
      					
		        <input id="uploadBtn" type="button" value="Submit"></input>
		    </fieldset>
		</form>
	</div>
</body>
</html>
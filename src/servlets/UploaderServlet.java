package servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/UploaderServlet")
public class UploaderServlet extends HttpServlet {
	private static final long serialVersionUID = 1809724554045451657L;
	private static final String UPLOAD_DIRECTORY = "/Users/marcus/remover";
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		
		String uploadPath = UPLOAD_DIRECTORY + File.separator + new Date().getTime(); ;		
		System.out.println("upload path >>> " + uploadPath);
		 // creates the directory if it does not exist
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
        	System.out.println("creating directory");
            uploadDir.mkdir();
        }
		
		
		String result = "";
		
		try {
			List<FileItem> items = upload.parseRequest(request);
			Iterator<FileItem> iter = items.iterator();
			int index = 0;

			result += "[";
			
			while (iter.hasNext()) {
			    FileItem item = iter.next();
			    
			    if (!item.isFormField()) {
			    				    	
			    	String fileName = new File(item.getName()).getName();
					String filePath = uploadPath + File.separator + fileName;
					System.out.println("filePath >>> " + filePath);
					File storeFile = new File(filePath);
					
				    if (index != 0) {
				    	result += ", ";
				    }


					String feedback = processUploadedFile(item);
					
					// saves the file on disk
					item.write(storeFile);
			        
			        //Handle IE7 ugly uploading bug
			        if (feedback == null) {
			        	continue;
			        } else {
			        	result += feedback;
			        }
			        
				    ++index;
				    
				    System.out.println(index);
			    }
			}
			
			result += "]";
			
			System.out.println(result);
			
		} catch (Exception e) {
			result = "{'error':'" + e.getLocalizedMessage() + "'}";
			e.printStackTrace();
		}
		
		respondToClient(request, response, result);
	}
	
	

	private String processUploadedFile(FileItem item) {
		byte[] data = item.get();
	    String fileName = item.getName();
	    String contentType = item.getContentType();
	    
	    // Handle IE7 file uploading ugly bug ...
	    if (fileName.equals("")) {
	    	return null; //ignore
	    }
	    
		System.out.println(fileName + ", " + contentType + ", " + data.length);	    
	    
	    return "{'fileName':'" + fileName + "', " + 
	    		"'contentType':'" + contentType + "', " + 
	    		"'size':" + data.length + ", " + 
	    		"'id':" + (System.currentTimeMillis() + new Random().nextInt(100)) + "}";
	}
	
	private void respondToClient(HttpServletRequest request, HttpServletResponse response, String result) throws IOException {
        response.setContentType("text/html");
		PrintWriter writer = response.getWriter();		
		String browser = request.getHeader("User-Agent");
		
		if (browser.indexOf("MSIE 9") > 0 || browser.indexOf("MSIE 8") > 0 || browser.indexOf("MSIE 7") > 0 ) {
			
			// For IE 9, 8, and 7 browser, render JSON object inside text area ...
			//String sampleOutput = "<textarea>{'success':'true', 'id':'123456789'}</textarea>";
			writer.write("<textarea>" + result + "</textarea>");
		} else {
			
			//For non-IE browsers, render normal JSON objects.
			//String sampleOutput = "{\"success\":\"true\", \"id\":\"123456789\"}";
			writer.write(result.replace("'", "\""));
		}		

		writer.flush();		
	}
}

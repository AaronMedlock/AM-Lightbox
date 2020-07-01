/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                A M    L I G H T B O X    P L U G I N                *         
 * A simple lightbox plugin that programmatically adds a lightbox to   *
 * the end of a web page's HTML by creating a modal with a dynamically *
 * populated image gallery. Implementation requires only populating    *
 * the image group name, such as a portfolio piece, the class of the   *
 * preview / thumbnail image, the class of the "pages" / gallery, and  *
 * the folder location for the images.                                 *
 *                                                                     *
 *  @author Aaron Medlock                                              *
 *  @version 0.5                                                       *
 *                                                                     *
 *                                                                     *
 *                 USER SPECIFIED VALUES  (edit these)                 *
 *                                                                     *
 * "lightboxGroups" - Add the groupname in quotes between the brackets *
 *                    to denote the desired group. For example, a      *
 *                    portfolio piece called "poster1" would look like *
 *                    this:                                            *
 *                     lightboxGroups = ["poster1","item2", "item3"]   *
 *                                                                     *
 * "lightboxImages" - Add how many images are in each group. For       *
 *                    example, if there was only one poster image and  *
 *                    "item2" from the example above was a process     *
 *                    book with 12 images, it would look like this:    *
 *                     lightboxImages = [1, 12, 1]                     *
 *                                                                     *
 * "previewClass" - Add the class name of the thumbnail / preview      *
 *                  images / button. For example, if a using the       *
 *                  covers of portfolio process books as buttons,      *
 *                  use the class name that was assigned to them       *
 *                  like:  previewclass = "my-thumbnails"              *
 *                                                                     *
 * "pagesClass" - Add the name of the class that implements the        *
 *                desired appearance of the images once the lightbox   *
 *                is shown. For example, if a class called "my-imgs"   *
 *                was created to force the images to appear at 50% of  *
 *                the total screen size, it would be entered like:     *
 *                pagesClass = "my-imgs"                               *
 *                                                                     *
 * "imgFolder" - Add the name of the folder(s) that the images exist.  *
 *               For example, if an image's path is:                   *
 *               img/fullsize/portfolio-01.png                         *
 *               The entry would look like:                            *
 *               imgFolder = "img/fullsize/";                          *
 *                                                                     *
 * ADDITIONAL INFORMATION:                                             *
 * > Use "thumb_" in front of name for IDs of thumb / previews buttons *
 * > Use UNIFORM NAMES for images and denote desired order in ##       *
 *   format sequentially. For example: myImgGroup-01, myImgGroup-02, ..*
 * > Use a "-" to separate the numbers from the groupname. Group names *
 *   are fully customizable (within limits of server file naming) but  *
 *   image numbers MUST appear in a -## format.                        *
 * > Do NOT edit variable names (like "imgFolder" or "lightboxGroups"  *
 *   as this will break the plugin.                                    *
 *                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const lightboxGroups = ["", ""], //e.g. ["group1", "group2", "group3"]
	  lightboxImages = [0, 0],   //e.g. [13, 3, 7]
	  previewClass = "",         //e.g. "my-thumbnails"
	  pagesClass = "",           //e.g. "my-fullscreen-images"
	  imgFolder = "";            //e.g. "img/fullsize/"



/* * * * * * * * * * * * * * * * * * * *
 * ! ! ! ! !  W A R N I N G  ! ! ! ! ! *
 * Do NOT edit the code below this     *
 * line. Edit ONLY the code above.     *
 * ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! *
 * * * * * * * * * * * * * * * * * * * */





//Global Variables
var lightboxWrapper = document.createElement("div"),
	lightboxContainer = document.createElement("div"),
	lightboxOpenButton = document.getElementsByClassName(previewClass),
	lightboxActiveImgGroup;

//Call to initialization function
initLightbox(imgFolder, previewClass, pagesClass);


/**
 * @method initLightbox
 * Utilizing the specified constants at the top of the document, the initLightbox method
 * creating an HTML div container and populating it with images.
 *
 * @param previewImgClass The name of the class for the image / button is clicked to open modal.
 */
function initLightbox(imgLoc, previewImgClass, lightboxClass){
	//Initialize lightbox wrapper & container
	lightboxWrapper.id = "lightbox-wrapper";
	document.body.appendChild(lightboxWrapper);
	lightboxContainer.id = "lightbox-container";
	lightboxWrapper.appendChild(lightboxContainer);
	
	lightboxContainer.innerHTML += "<span class=\"lightbox-close cursor\" onclick=\"modalDisplay(\'none\',\'null\')\">\
									&times;</span><div class=\"lightbox-prev\">&#10094;&#10094;&#10094;<span class=\"lightbox-prevtxt\">Scroll right to view</span></div>";
	
	
	//Populate lightbox wrapper with image containers
	for(let i = 0; i < lightboxGroups.length; i++){
		let lightboxNode = document.createElement("div");
		lightboxNode.id = "set_" + lightboxGroups[i];
		lightboxNode.classList.add("lightbox-imgbox");

		//Populate each image set container with actual images
		for(let j = 1; j <= lightboxImages[i]; j++){
			let lightboxImg = document.createElement("img");
			lightboxImg.id = lightboxGroups[i] + "-" + j;
			
			if(j < 10){
				lightboxImg.src = imgLoc + lightboxGroups[i] + "-0" + j +".png";
			} else {
				lightboxImg.src = imgLoc + lightboxGroups[i] + "-" + j +".png";
			}
			lightboxNode.appendChild(lightboxImg).classList.add(lightboxClass);
		}
		lightboxNode.style.display = "none";
		lightboxContainer.appendChild(lightboxNode);
	}
	
	//Add event listeners to the preview images
	for(let i = 0; i < lightboxOpenButton.length; i++) {
		lightboxOpenButton[i].addEventListener('click', function(){modalDisplay("block", lightboxGroups[i])});
	}
}

//Listen if the lightbox was clicked and close it
document.onclick = function(offscreen) {
    if (offscreen.target == document.getElementById("lightbox-container") || offscreen.target == document.getElementById(lightboxActiveImgGroup)){
		modalDisplay("none", "null");  
	}
}
window.onclick = function(offscreen) {
    if (offscreen.target == document.getElementById("lightbox-container") || offscreen.target == document.getElementById(lightboxActiveImgGroup)){
		modalDisplay("none", "null");  
	}
}

/**
 * @method modalDisplay
 * Assigns the "lightbox-storage" div a user specified display value. Typically "block" or "none"
 * to either show or hide, respectively, the lightbox and respective image group.
 *
 * @param displayValue The CSS display property value for the "lightbox-storage" div.
 */
function modalDisplay (displayValue, lightboxGroup){
	document.getElementById("lightbox-wrapper").style.display = displayValue;

	if(displayValue != "none"){ //Displayed image
		lightboxActiveImgGroup = "set_" + lightboxGroup;
		document.getElementById(lightboxActiveImgGroup).style.display = "block"; //Activate IMG group
	} else {
		document.getElementById(lightboxActiveImgGroup).style.display = displayValue;
	}
}
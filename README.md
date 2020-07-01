# AM Lightbox Plugin
A simple lightbox plugin that programmatically adds a lightbox to the end of a web page's HTML by creating a modal with a dynamically populated image gallery. Implementation requires only populating the image group name, such as a portfolio piece, the class of the preview / thumbnail image, the class of the "pages" / gallery, and the folder location for the images.

 *  **Author:** Aaron Medlock
 *  **Current version:** 0.5.0


## USER SPECIFIED VALUES  (edit these)

### "lightboxGroups"
Add the groupname in quotes between the brackets to denote the desired group. For example, a portfolio piece called "poster1" would look like this:                                        `lightboxGroups = ["poster1","item2", "item3"]`

### "lightboxImages"
Add how many images are in each group. For example, if there was only one poster image and "item2" from the example above was a process book with 12 images, it would look like this: `lightboxImages = [1, 12, 1]`

### "previewClass"
 Add the class name of the thumbnail / preview images / button. For example, if a using the covers of portfolio process books as buttons, use the class name that was assigned to them like:  `previewclass = "my-portfolio-thumb"`

### "pagesClass"
Add the name of the class that implements the desired appearance of the images once the lightbox is shown. For example, if a class called "my-imgs" was created to force the images to appear at 50% of the total screen size, it would be entered like: `pagesClass = "my-imgs"`

### "imgFolder"
Add the name of the folder(s) that the images exist. For example, if an image's path is: `img/fullsize/portfolio-01.png`. The entry would look like: `imgFolder = "img/fullsize/";`

### ADDITIONAL INFORMATION:
 * Use "thumb_" in front of name for IDs of thumb / previews buttons
 * Use UNIFORM NAMES for images and denote desired order in ## format sequentially. For example: `myImgGroup-01, myImgGroup-02, ..`
 * Use a "-" to separate the numbers from the groupname. Group names are fully customizable (within limits of server file naming) but image numbers MUST appear in a `-##` format.
 
 ## UPCOMING REVISIONS / FEATURES
 * Improve ease of selecting slides (outside of JS)
 * Add richer mobile interaction
 * Improve friendliness of adding files / groups
 * Increase robustness of plugin

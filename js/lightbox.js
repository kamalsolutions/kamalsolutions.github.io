//problem: user when clicking on image, goes to a dead end
//solution: create an overlay with the large image - Lightbox


/*declaring a variable called overlay so that it
can be used multiple times
*/

// add an overlay
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $("<p></p>");

//appending image to overlay then overlay gets appended to body
$overlay.append($image);
  //a caption
  $overlay.append($caption)

  //
$("body").append($overlay);




$("#image-gallery a").click(function(event/*using an event in the function*/){
event.preventDefault();// prevents the browser's default action

// capture the click event on a link to an image
 var imageLocation= $(this).attr('href'); // selects attributes

 // update overlay with the image linked in the link
$image.attr("src", imageLocation);
   // show the overlay.
$overlay.show();

// Get child's alt attribute and set caption
var captionText = $(this).children('img').attr("alt");
 $caption.text(captionText);

});


    //3 when overlay is clicked, hide the overlay
$overlay.click(function(){
  $overlay.hide();
})

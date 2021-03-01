

var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
    alert("Upload Successful!")
};

$( ".b1" ).click(function() {
    var src = $( ".b1" ).attr('src')
    $( "#border" ).attr('src', src)
    download()
});

$( ".b2" ).click(function() {
    var src = $( ".b2" ).attr('src')
    $( "#border" ).attr('src', src)
    download()
});

$( ".b3" ).click(function() {
    var src = $( ".b3" ).attr('src')
    $( "#border" ).attr('src', src)
    download()
});

$( ".b4" ).click(function() {
    var src = $( ".b4" ).attr('src')
    $( "#border" ).attr('src', src)
    download()
});


function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function download() {
    //
    var bordersrc = $( "#border" ).attr('src')
    console.log(bordersrc)
    var imgsrc = $( "#output" ).attr('src')
    console.log(imgsrc)

    
    var canvas = document.getElementById('canvas').getContext('2d');
    
    var canvasImage1 = new Image();

    function drawCanvasImage(){
        drawImageProp(canvas, canvasImage1, 0, 0, 500, 500);
    };

    canvasImage1.addEventListener('load',drawCanvasImage,false);

    canvasImage1.src=`${imgsrc}`;
    
    canvasImage = new Image();

    function drawCanvasImage1(){
        drawImageProp(canvas, canvasImage, 0, 0, 500, 500);
    };

    canvasImage.addEventListener('load',drawCanvasImage1,false);

    canvasImage.src=`${bordersrc}`;

}

download_img = function(el) {
  var canvas = document.getElementById('canvas')
  var image = canvas.toDataURL("image/png");
  el.href = image;
};

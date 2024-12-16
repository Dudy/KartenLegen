window.onload = function() {
    var canvas = document.getElementById('pokerCanvas');
    var context = canvas.getContext('2d');

    // Load the texture image
    var textureImg = new Image();
    textureImg.onload = function() {
        // Create a pattern with the image
        var pattern = context.createPattern(textureImg, 'repeat');
        context.fillStyle = pattern;

        // Fill the canvas with the pattern
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    textureImg.src = 'data/dark-green-wall.jpg';
};

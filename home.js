
$(function() {
    var video = $("video");
    var thumbnail = $("canvas");
    var input = $("input[type=file]");
    var ctx = thumbnail.get(0).getContext("2d");
    var duration = 0;
    var img = $("img");
    

    input.on("change", function(e) {
        var file = e.target.files[0];
        // Validate video file type
        if (["video/mp4"].indexOf(file.type) === -1) {
            alert("影片上傳格式不符 請重新上傳");
            location.href='home.html'
            return; 
        }
        // Set video source
        video.find("source").attr("src", URL.createObjectURL(file));
        // Load the video
        video.get(0).load();
        // Load metadata of the video to get video duration and dimensions
        video.on("loadedmetadata", function(e) {
            duration = video.get(0).duration;
            // Set canvas dimensions same as video dimensions
            thumbnail[0].width = video[0].videoWidth;
            thumbnail[0].height = video[0].videoHeight;
            // Set video current time to get some random image
            video[0].currentTime = Math.ceil(duration / 2);
            // Draw the base-64 encoded image data when the time updates
            video.one("timeupdate", function() {
                // ctx.drawImage(video[0], 460, 255, 995, 500);
                var w=window.innerWidth;
                var h=window.innerHeight;
                ctx.drawImage(video[0], w*0.3, h*0.345, w*0.65, h*0.65);
                img.attr("src", thumbnail[0].toDataURL());
            });
            //flag=true
        });
    });
});




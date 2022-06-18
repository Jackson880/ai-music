music1="";
music2="";
music1_status="";
music2_status="";
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
scoreLeftWrist= 0;
scoreRightWrist= 0;

function preload()
{
    music1=loadSound("music1.mp3");
    music2=loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
    console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX +"rightWristY = "+ rightWristY);
    } else {
        console.log('No Results');
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0, 0, 400, 400);
    
    fill("red");
    stroke("black");

    music1_status = music1.isPlaying();
    music2_status = music2.isPlaying();

    if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
        music1.stop();
    if(music2_status == false) {
        music2.play();
        document.getElementById("song").innerHTML="Playing peter pan song";
    }
    }
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
            music2.stop();
        if(music1_status == false) {
            music1.play();
            document.getElementById("song").innerHTML="Playing harry potter song";
        }
        }
}
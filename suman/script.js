
const video =
    document.getElementById("video");

const startButton =
    document.getElementById("startButton");

const faceStatus =
    document.getElementById("faceStatus");

const message =
    document.getElementById("message");

let scanning = false;
let unlocked = false;


// ================================
// LOAD FACE MODEL
// ================================

async function loadModel() {

    faceStatus.textContent =
        "📷 Loading...";

    const MODEL_URL =
        "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";

    try {

        await faceapi.nets.tinyFaceDetector
            .loadFromUri(MODEL_URL);

        return true;

    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ Face model failed.";

        message.className =
            "error";

        return false;
    }
}


// ================================
// CAMERA
// ================================

async function startCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 320,
                    height: 240
                },
                audio: false
            });

        video.srcObject = stream;

        await video.play();

        faceStatus.textContent =
            "📷 Camera Ready";

        return true;

    } catch (error) {

        console.error(error);

        message.textContent =
            "❌ Allow camera access.";

        message.className =
            "error";

        return false;
    }
}


// ================================
// SCAN FACE
// ================================

async function scan() {

    if (!scanning || unlocked) {
        return;
    }

    try {

        const detection =
            await faceapi.detectSingleFace(
                video,
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 160,
                    scoreThreshold: 0.3
                })
            );


        if (detection) {

            unlocked = true;

            faceStatus.textContent =
                "📷 Face: ✅ Detected";

            message.textContent =
                "🎉 ACCESS GRANTED!";

            message.className =
                "success";


            // Stop camera

            const stream =
                video.srcObject;

            if (stream) {

                stream.getTracks().forEach(
                    track => track.stop()
                );
            }


            // OPEN HOME PAGE

            setTimeout(() => {

                window.location.href =
                    "home.html";

            }, 500);

            return;
        }


        faceStatus.textContent =
            "📷 Looking for face...";

    } catch (error) {

        console.error(error);
    }


    setTimeout(scan, 100);
}


// ================================
// START
// ================================

function startAuthentication() {

    if (scanning) return;

    scanning = true;

    startButton.disabled = true;

    startButton.textContent =
        "🔍 Scanning...";

    message.textContent =
        "Look at the camera.";

    scan();
}


// ================================
// BUTTON
// ================================

startButton.addEventListener(
    "click",
    startAuthentication
);


// ================================
// INITIALIZE
// ================================

async function init() {

    startButton.disabled = true;

    const model =
        await loadModel();

    if (!model) return;

    const camera =
        await startCamera();

    if (!camera) return;

    startButton.disabled = false;

    message.textContent =
        "Ready!";
}

init();


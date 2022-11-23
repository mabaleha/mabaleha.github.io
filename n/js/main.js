//global variable
let width  =500,
    height = 0,
    filter = 'none',
    streaming = false;

    //Dom Elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photos = document.getElementById('photos');
    const photoButton = document.getElementById('photo-button');
    const clearButton = document.getElementById('clear-button');
    const photoFilter = document.getElementById('photo-filter');

    // Get media stream
    navigator.mediaDevices.getUserMedia({video: true, audio: false}
        )
        .then(function(stream) {
            //link to the video
            video.srcObject =stream;
            //play video
            video.play();
        })
        .catch(function(err){
            console.log('Error: ${err}');
        });

        //Play when ready
        video.addEventListener('canplay',function(e){
            if(!streaming){
                //set video / canvas height
                height = video.videoHeight / (video.videoWidth / width);
               
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);

                streaming = true;
            }
        }, false);

        //photo button event
        photoButton.addEventListener('click', function(e){
            takePicture();
            e.preventDefault();
        }, false);

    
        // fiter the event
        photoFilter.addEventListener('change', function(e){

            //set filter tochosen option
            filter = e.target.value;
            //set filter to video
            video.style.filter = filter;

            e.preventDefault();
        });

        //Clear event
        clearButton.addEventListener('click', function(e){
            //Clear pthoto
            photos.innerHTML ='';


            //Change filter back to normal
            filter = 'none';
            //set video filter
            video.style.filter = filter;
            // Reset selected list
            photoFilter.selectedIndex = 0;
        });
        //take picture from canvas
        function takePicture(){
            //create canvas
            const context = canvas.getContext('2d');
            if(width && height){
                //set canvas pros
                canvas.width = width;
                canvas.height =height;
                //Draw an image of the video on the canvas
                context.drawImage(video, 0, 0, width, height);

                //create image from the canvas
                const imgUrl =canvas.toDataURL('image/png');

                //create img element
                const img = document.createElement('img');

                //Set image src
                img.setAttribute('src', imgUrl);

                //set image filter
                img.style.filter = filter;

                //Add image to photos
                photos.appendChild(img);

            }
        }

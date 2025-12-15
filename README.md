# Capstone - Coloryze: Automated Personal Color Profile and Face Shape Analysis  

## Technical References Used
[1] Face landmark detection guide for Python. (2025). Google AI for Developers. https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/python  
  
[2] Mediapipe facemesh vertices mapping. (2022, December 1). Stack Overflow. https://stackoverflow.com/questions/69858216/mediapipe-facemesh-vertices-mapping  
  
[3] Cloudinary. (2024, December 13). Upload webcam photos in React - Dev Hints [Video]. YouTube. https://www.youtube.com/watch?v=F4GWDaVA9J8    
  
[4] vlogize. (2022, December 13). How to convert Base64 to image file in JavaScript [Video]. YouTube. https://www.youtube.com/watch?v=-_pwtmOZDlY    
  
[5] DigitalSreeni. (2022, December 23). White balancing your pictures using Python [Video]. YouTube. https://www.youtube.com/watch?v=Z0-iM37wseI&t=707s  

## Prerequistites  
Have Node.js, Python, and pip installed on your device/enviorment.  

sudo apt install nodejs npm

sudo apt install python3 python3-pip python3-venv -y



## Frontend Setup
cd frontend  
npm install  
npm install react-webcam html2canvas jspdf  


## Backend Setup
cd backend  
python3 -m venv venv  
#Linux/MacOS#  
source venv/bin/activate  
#Windows#  
venv\Scripts\activate  
pip install fastapi uvicorn pydantic numpy opencv-python mediapipe python-multipart
  


## Starting up frontend server
cd frontend  
npm run dev  


## Starting up backend server
cd backend  
uvicorn server:app --reload --port 8000  

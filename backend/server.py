from typing import List
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import mediapipe as mp
import math

from pydantic import BaseModel

app = FastAPI()

# Allow frontend dev server to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

##############Class###############
class FaceAnalysisResponse(BaseModel):
    faceshape: str
    focalpoints: List[str]
    proportions: List[int]

##Variables##
#Initializing face mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=True,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.8
)

facePoints = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 215, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]
noseCutout = [64, 48, 115, 220, 45, 4, 275, 440, 344, 278, 294, 460, 326, 2, 97, 98]
eyeZoneCutout = [34, 139, 71, 68, 104, 69, 108, 151, 337, 299, 333, 298, 301, 368, 264, 346, 347, 348, 343, 351, 168, 122, 114, 119, 118, 117]
lipPoints = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146]
######################################

##################Functions for Facial Analysis#############################
def getlength(p1, p2):
    #Get Vector
    x1,y1 = p1
    x2, y2 = p2
    v = ((x2-x1), (y2-y1))

    #Get vector length
    x,y = v
    vx = math.pow(x,2)
    vy = math.pow(y,2)
    vLength = math.sqrt(vx+vy)
    vlength = abs(vLength)

    return vLength

def approximatelyEqual(a, b):
    difference = abs(a-b)
    PercentDiff = ((a+b)/2) * 0.1
    if difference < PercentDiff:
        return True
    else:
        return False
    
def isWidest(subject, a, b):
    aBool = approximatelyEqual(subject, a)
    bBool = approximatelyEqual(subject, b)

    if aBool == False and bBool == False:
        if subject > a and subject > b:
            return True    
    return False

def eyeProportion(sBE, lEL, rEL):
    avgEL = (lEL+rEL)/2

    if approximatelyEqual(avgEL, sBE):
        return 0
    elif avgEL > sBE:
        return 1
    elif avgEL < sBE:
        return -1
    
def noseProportion(nW, sBE):

    if approximatelyEqual(nW, sBE):
        return 0
    elif nW > sBE:
        return 1
    elif nW < sBE:
        return -1
    
def lipProportion(nw, lipLen):

    if (nw/lipLen) < 0.8 and (nw/lipLen) > 0.6:
        return 0
    elif (nw/lipLen) < 0.6:
        return 1
    elif approximatelyEqual(nw, lipLen) or lipLen < nw or (nw/lipLen) > 0.8:
        return -1
############################################################################


@app.post("/ColorAna")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if image is None:
        return JSONResponse({"error": "Invalid image"})

    #Make RGB and CIELAB copy
    RGBimage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) #For mediapipe
    CLABimage = cv2.cvtColor(image, cv2.COLOR_BGR2LAB) #For color extraction

    #Image height and width
    height, width = image.shape[:2]

    #White balance CIELAB image to account for different types of lighting
    lVal = CLABimage[:,:,0]
    aVal = CLABimage[:,:,1]
    bVal = CLABimage[:,:,2]
    avgAChannel = np.mean(aVal)
    avgBChannel = np.mean(aVal)
    aVal = aVal - ((avgAChannel-128)*(lVal/255.0))
    bVal = bVal - ((avgBChannel-128)*(lVal/255.0))

    #Setting white-balanced values back to CIELAB image
    CLABimage[:,:,1] = aVal
    CLABimage[:,:,2] = bVal

    #Get facial landmarks
    result = face_mesh.process(RGBimage)

    if not result.multi_face_landmarks:
        return JSONResponse({"error": "No face detected"})

    #Getting relevant facial landmark coordinates
    for facial_landmarks in result.multi_face_landmarks:
        for i in range(0, 468):
            pt = facial_landmarks.landmark[i]
            x = int(pt.x * width)
            y = int(pt.y * height)

            #Snatching lip cordinates
            for j in range(len(lipPoints)):
                if(i == lipPoints[j]):
                    point = (x, y)
                    lipPoints[j] = point

            #Snatching face cordinates
            for k in range(len(facePoints)):
                if(i == facePoints[k]):
                    point = (x, y)
                    facePoints[k] = point

            #Snatching noseCutout cordinates
            for n in range(len(noseCutout)):
                if(i == noseCutout[n]):
                    point = (x, y)
                    noseCutout[n] = point

            #Snatching eyeZoneCutout cordinates
            for o in range(len(eyeZoneCutout)):
                if(i == eyeZoneCutout[o]):
                    point = (x, y)
                    eyeZoneCutout[o] = point


    #Extracting relevant skin tone
    #Creating relevant polygon
    lPoints = np.array(lipPoints, dtype=np.int32).reshape((-1, 1, 2))
    fPoints = np.array(facePoints, dtype=np.int32).reshape((-1, 1, 2))
    nCutout = np.array(noseCutout, dtype=np.int32).reshape((-1, 1, 2))
    eZCutout = np.array(eyeZoneCutout, dtype=np.int32).reshape((-1, 1, 2))

    #Extracting skintone from CIELAB image
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    #cv2.fillPoly(mask, [testPoints], 255)
    cv2.fillPoly(mask, [fPoints], 255)
    cv2.fillPoly(mask, [eZCutout, nCutout, lPoints], 0)
    avgCLAB = cv2.mean(CLABimage, mask=mask)[:3]

    #Normalize CLAB values
    L = avgCLAB[0] * 100 / 255
    a = avgCLAB[1] - 128
    b = avgCLAB[2] - 128
    a2 = math.pow(a,2)
    b2 = math.pow(b,2)
    chroma = math.sqrt(a2+b2)
    hue = (math.atan2(b, a)) * (180/math.pi)
    if hue < 0:
        hue = hue + 360


    #Result vars
    undertone = ""
    overallTone = ""
    saturation = ""
    tone1 = ""
    tone2 = ""

    #Warm or Cool
    if hue >= 0 and hue <=100:
        undertone = "warm"
    elif hue > 100 and hue <= 180:
        undertone = "neutral"
    elif hue > 180 and hue <= 240:
        undertone = "cool-neutral"
    elif hue > 240:
        undertone = "cool"

    #Depth/saturation
    if chroma <= 5:
        saturation = "soft"
    elif chroma > 5 and chroma <= 12:
        saturation = "clear"
    elif chroma > 12 and chroma <= 22:
        saturation = "vibrant"
    elif chroma > 22:
        saturation = "bold"

    #Tones
    if a < 0:
        tone1 = "green"
    elif a > 0:
        tone1 = "red"

    if b < 0:
        tone2 = "blue"
    elif b > 0:
        tone2 = "yellow"

    if a == 0 and b == 0:
        overallTone = "neutral"
    elif a == 0:
        overallTone = tone2
    elif b == 0:
        overallTone = tone1

    #absolute the values
    aR = abs(a)
    bR = abs(b)

    if tone1 == "red" and tone2 == "yellow":
        if aR == bR:
            overallTone = "orange/golden"
        elif aR < bR:
            overallTone = "warm yellow"  
        elif aR > bR:
            overallTone = "peach-red"

    elif tone1 == "green" and tone2 == "yellow":
        if aR == bR:
            overallTone = "warm olive"
        else:
            overallTone = "olive"

    elif tone1 == "red" and tone2 == "blue":
        if aR == bR or bR > aR:
            overallTone = "blue-violet"
        elif aR > bR:
            overallTone = "cool red"

    elif tone1 == "green" and tone2 == "blue":
        if aR == bR:
            overallTone = "cool olive"
        else:
            overallTone = "cool blue"

    #Result Array
    color_analysis_results = [undertone, overallTone, saturation]
    
    
    return {"color_analysis_results": color_analysis_results}

@app.post("/FaceAna")
async def analyze_face(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if image is None:
        return JSONResponse({"error": "Invalid image"})
    #Make RGB copy
    RGBimage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) #For mediapipe

    #Image height and width
    height, width = image.shape[:2]

    ##################Image Display Scaling for debugging only######################
    screen_width = 800
    screen_height = 600
    scale = min(screen_width / width, screen_height / height)

    if scale < 1:
        adjusted_width = int(width * scale)
        adjusted_height = int(height * scale)
        image = cv2.resize(image, (adjusted_width, adjusted_height), interpolation=cv2.INTER_AREA)
    else:
        adjusted_width = width
        adjusted_height = height
    ####################################################################################


    #Get facial landmarks
    result = face_mesh.process(RGBimage)

    if not result.multi_face_landmarks:
        return JSONResponse({"error": "No face detected"})

    #Getting relevant facial landmark coordinates
    for facial_landmarks in result.multi_face_landmarks:
        for i in range(0, 468):
            pt = facial_landmarks.landmark[i]
            x = int(pt.x * adjusted_width)
            y = int(pt.y * adjusted_height)

            if i == 133:
                lEyeInnerCorner = (x, y)
            elif i == 362:
                rEyeInnerCorner = (x, y)

            if i == 130:
                lEyeOuterCorner = (x, y)
            elif i == 359:
                rEyeOuterCorner = (x, y)

            if i == 10:
                faceTop = (x,y)
            elif i == 152:
                faceBottom = (x, y)

            if i == 172:
                jawLine1 = (x,y)
            elif i == 397:
                jawline2 = (x, y)
            
            if i == 176:
                chin1 = (x,y)
            elif i == 400:
                chin2 = (x, y)

            if i == 234:
                cheekbone1 = (x,y)
            elif i == 454:
                cheekbone2 = (x, y)

            if i == 21:
                forehead1 = (x,y)
            elif i == 251:
                forehead2 = (x, y)

            if i == 129:
                nose1 = (x,y)
            elif i == 358:
                nose2 = (x, y)

            if i == 61:
                lip1 = (x,y)
            elif i == 291:
                lip2 = (x, y)
    proportions = []

    #Get width of chin
    chinWidth = getlength(chin1, chin2)

    #Get width of jaw
    jawWidth = getlength(jawLine1, jawline2)

    #Get width of cheekbones
    faceWidth = getlength(cheekbone1, cheekbone2)

    #Forhead Width
    foreheadWidth = getlength(forehead1, forehead2)

    #Get face lengths
    faceLength = getlength(faceBottom, faceTop)
    faceLength = faceLength + (faceLength/6)

    #Get length between eyes
    lenBetweenEyes = getlength(lEyeInnerCorner, rEyeInnerCorner)
    
    #Get r eye length
    rEyeLength = getlength(rEyeOuterCorner, rEyeInnerCorner)

    #Get left eye length
    lEyeLength = getlength(lEyeInnerCorner, lEyeOuterCorner)

    #Get nose width
    nWidth = getlength(nose1, nose2)

    #Get mouth length
    mWidth = getlength(lip1, lip2)

    #Exam Eye Proportion
    eyePorp = eyeProportion(lenBetweenEyes, lEyeLength, rEyeLength)
    proportions.append(eyePorp)

    #Exam nose width
    nosePorp = noseProportion(nWidth, lenBetweenEyes)
    proportions.append(nosePorp)

    #Mouth length
    mouthPorp = lipProportion(nWidth, mWidth)
    proportions.append(mouthPorp)

    faceshape = ""
    focalpoints=[]

    #Find focal points
    eyes = proportions[0]
    nose = proportions[1]
    mouth = proportions[2]

    if nose > eyes and nose > mouth and mouth == eyes:
        focalpoints = ["nose"]
    elif nose > eyes and nose > mouth and mouth != eyes:
        if mouth > eyes:
            focalpoints = ["nose", "mouth"]
        else:
            focalpoints = ["eyes", "nose"]
    elif mouth > nose and mouth > eyes and nose == eyes:
        focalpoints = ["mouth"]
    elif mouth > nose and mouth > eyes and nose != eyes:
        if nose > eyes:
            focalpoints = ["nose", "mouth"]
        else:
            focalpoints = ["eyes", "mouth"]
    elif eyes > mouth and eyes > nose and mouth == nose:
        focalpoints = ["eyes"]
    elif eyes > mouth and eyes > nose and mouth != nose:
        if mouth > nose:
            focalpoints = ["eyes", "mouth"]
        else:
            focalpoints = ["eyes", "nose"]
    elif mouth == eyes and eyes == nose:
            focalpoints = []
    elif eyes < mouth and eyes < nose and nose == mouth:
        focalpoints = ["nose", "mouth"]
    elif nose < mouth and nose < eyes and eyes == mouth:
        focalpoints = ["eyes", "mouth"]
    elif mouth < eyes and mouth < nose and nose == eyes:
        focalpoints = ["eyes", "nose"]


    #Faceshape determination
    if approximatelyEqual(faceLength, faceWidth) == True and isWidest(faceWidth) == True:
        faceshape = "round"
    elif (faceLength/faceWidth) >= (1.46) and approximatelyEqual(foreheadWidth, jawWidth) == True:
        faceshape = "rectangle"
    elif (jawWidth/faceWidth) >= .80:
        faceshape = "square"
    elif isWidest(jawWidth, faceWidth, foreheadWidth) == True:
        faceshape = "triangle"
    elif (faceLength/faceWidth) >= (1.46):
        faceshape = "oblong"
    elif isWidest(foreheadWidth, faceWidth, jawWidth) == True:
        faceshape = "heart"
    elif isWidest(faceWidth, foreheadWidth, jawWidth) == True:
        faceshape = "diamond"
    else:
        faceshape = "oval"


    return FaceAnalysisResponse(
        faceshape=faceshape,
        focalpoints=focalpoints,
        proportions=proportions
    )
import requests
import json
import urllib.request
from PIL import Image
import base64

user_input = 'pink elephant playing piano'

r = requests.post(
    "https://api.deepai.org/api/text2img",
    data={
        'text': user_input,
    },
    headers={'api-key': '7d6a009b-d9da-4e44-ac31-d2a3fe00db12'}
)

# Holds image URL
image_url = r.json()['output_url']

# Saves image file
image_file = urllib.request.urlretrieve(image_url, "./requested-image.jpg")

# Crops and saves a quadrant of generated images
image = Image.open('./requested-image.jpg')

width, height = image.size
left = 0
right = width/2
top = 0
bottom = height/2

image_cropped = image.crop((left,top,right,bottom))
image_cropped = image_cropped.save('./return_image.jpg')

# Writes image as a base64 type, returns a string and writes base64 data to encode.bin
with open('./return_image.jpg',"rb") as image2string:
    b64_string = base64.b64encode(image2string.read())

with open('./encode.bin',"wb") as file:
    file.write(b64_string)





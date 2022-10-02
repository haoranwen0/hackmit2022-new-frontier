import requests
import json
from PIL import Image
import urllib3.request
import base64

def handler(event, context):
  print('received event:')
  user_input = event["queryStringParameters"]["question"]
  r = requests.post(
    "https://api.deepai.org/api/text2img",
    data={
        'text': user_input,
    },
    headers={'api-key': '7d6a009b-d9da-4e44-ac31-d2a3fe00db12'}
  )
  image_url = r.json()['output_url']
  image_file = urllib3.request.urlretrieve(image_url, "./requested-image.jpg")
  image = Image.open('./requested-image.jpg')
  width, height = image.size
  left = 0
  right = width/2
  top = 0
  bottom = height/2

  image_cropped = image.crop((left,top,right,bottom))
  image_cropped = image_cropped.save('./return_image.jpg')
  
  with open('./return_image.jpg',"rb") as image2string:
    b64_string = base64.b64encode(image2string.read())
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(b64_string)
  }
  
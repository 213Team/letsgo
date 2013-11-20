from random import Random
import os

def random_str(randomlength=24):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str+=chars[random.randint(0, length)]
    return str

def get_upload_filename(instance, filename):
    return 'static/pic/' + random_str() + os.path.splitext(filename)[1]

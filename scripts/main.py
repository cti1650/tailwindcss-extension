from collections import OrderedDict
import os
import sys
import json
import shutil
import glob
import cv2
import numpy as np
from PIL import Image

current_path = 'extensions'


def manifest_data():
    file = glob.glob('**/manifest.json')
    if file:
        with open(file[0]) as f:
            d_update = json.load(f, object_pairs_hook=OrderedDict)
        return {
            "fullpath": file[0],
            "path": os.path.relpath(file[0]).replace(os.path.basename(file[0]), ''),
            "name": os.path.basename(file[0]),
            "dirname": os.path.dirname(file[0]),
            "json": d_update
        }
    else:
        return {
            "fullpath": '',
            "path": '',
            "name": '',
            "dirname": '',
            "json": ''
        }


def load_manifest():
    with open(manifest_data()["fullpath"]) as f:
        d_update = json.load(f, object_pairs_hook=OrderedDict)
    return d_update


def save_manifest(dic):
    with open(manifest_data()["fullpath"], 'w') as f:
        json.dump(dic, f, indent=2, ensure_ascii=False)


def setting_version(version_str, key):
    version = version_str.split('.')
    if len(version) == 1:
        version.extend(['0', '0'])
    elif len(version) == 2:
        version.extend(['0'])
    if key == "major":
        version[0] = str(int(version[0]) + 1)
        version[1] = str(0)
        version[2] = str(0)
    elif key == "minor":
        version[1] = str(int(version[1]) + 1)
        version[2] = str(0)
    elif key == "patch":
        version[2] = str(int(version[2]) + 1)
    elif key == "release":
        version[0] = str(1)
        version[1] = str(0)
        version[2] = str(0)
    elif key == "new":
        version[0] = str(0)
        version[1] = str(0)
        version[2] = str(1)
    return '.'.join(version)


def update(key):
    json = load_manifest()
    json['version'] = setting_version(json['version'], key)
    save_manifest(json)


def zip():
    data = manifest_data()
    print(shutil.make_archive(
        'zip_' + data["dirname"], 'zip', root_dir=data["path"]))


def iconResizeDataSave(img, size=128):
    baseName = "/icons/icon"
    if img:
        data = manifest_data()
        resize_img = img.resize((size, size))
        img_path = data["path"] + baseName + "-" + \
            str(size) + "x" + str(size) + ".png"
        json = data["json"]
        resize_img.save(img_path)
        json["icons"][str(size)] = baseName + "-" + \
            str(size) + "x" + str(size) + ".png"
        save_manifest(json)


def clearBkColor(img_path, img_savepath):
    img = cv2.imread(img_path, -1)
    img[:, :, 3] = np.where(np.all(img == 255, axis=-1),
                            0, 255)
    cv2.imwrite(img_savepath, img)


def iconResize():
    data = manifest_data()
    baseName = "/icons/icon"
    if os.path.isfile(data['path'] + baseName + ".png"):
        clearBkColor(data['path'] + baseName + ".png",
                     data['path'] + baseName + "_transparent.png")
        icon_view = Image.open(data['path'] + baseName + "_transparent.png")
        iconResizeDataSave(icon_view, size=128)
        iconResizeDataSave(icon_view, size=48)
        iconResizeDataSave(icon_view, size=19)
        iconResizeDataSave(icon_view, size=16)
    else:
        print("not icon")


if(len(sys.argv) > 1):
    key = str(sys.argv[1])
    print(key)
    if key == "major":
        update(key)
    elif key == "minor":
        update(key)
    elif key == "patch":
        update(key)
    elif key == "new":
        update(key)
    elif key == "release":
        update(key)
    elif key == "zip":
        zip()
    elif key == "mkicon":
        iconResize()
    elif key == "manifest":
        print(manifest_data())
    else:
        print("error")

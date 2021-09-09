import sys
import json
import shutil
from collections import OrderedDict

current_path = 'extensions'


def update(key):
    json_url = current_path + '/manifest.json'

    with open(json_url) as f:
        d_update = json.load(f, object_pairs_hook=OrderedDict)

    version = d_update['version'].split('.')

    if key == "major":
        version[0] = str(int(version[0]) + 1)
        if len(version) == 1:
            version.extend(['0', '0'])
        elif len(version) == 2:
            version.extend(['0'])
        version[1] = str(0)
        version[2] = str(0)

        d_update['version'] = '.'.join(version)

        with open(json_url, 'w') as f:
            json.dump(d_update, f, indent=2, ensure_ascii=False)
    elif key == "minor":
        if len(version) == 1:
            version.extend(['0', '0'])
        elif len(version) == 2:
            version.extend(['0'])
        version[1] = str(int(version[1]) + 1)
        version[2] = str(0)

        d_update['version'] = '.'.join(version)

        with open(json_url, 'w') as f:
            json.dump(d_update, f, indent=2, ensure_ascii=False)
    elif key == "patch":
        if len(version) == 1:
            version.extend(['0', '0'])
        elif len(version) == 2:
            version.extend(['0'])
        version[2] = str(int(version[2]) + 1)

        d_update['version'] = '.'.join(version)

        with open(json_url, 'w') as f:
            json.dump(d_update, f, indent=2, ensure_ascii=False)
    else:
        print("error")


def zip():
    print(shutil.make_archive('zip_' + current_path, 'zip', root_dir=current_path))


if(len(sys.argv) > 1):
    key = str(sys.argv[1])
    print(key)
    if key == "major":
        update(key)
    elif key == "minor":
        update(key)
    elif key == "patch":
        update(key)
    elif key == "zip":
        zip()
    else:
        print("error")

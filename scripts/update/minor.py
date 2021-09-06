import json
from collections import OrderedDict

json_url = 'extensions/manifest.json'

with open(json_url) as f:
    d_update = json.load(f, object_pairs_hook=OrderedDict)

version = d_update['version'].split('.')

if len(version) == 1:
    version.extend(['0','0'])
elif len(version) == 2:
    version.extend(['0'])
version[1] = str(int(version[1]) + 1)
version[2] = str(0)

d_update['version'] = '.'.join(version)

with open(json_url, 'w') as f:
    json.dump(d_update, f, indent=2, ensure_ascii=False)
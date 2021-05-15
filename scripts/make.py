import os

libraries = [
    "discord.js"
]

for lib in libraries:
    command = "npm i " + lib
    print(command)
    os.system(command)

print("Installed " + str(len(libraries)) + " Libraries")

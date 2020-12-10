import re


def replaceNewLines(s):
    return re.sub("\n", " ", s)


passports = []
with open('input.txt', "r") as file:
    allPassports = list(map(replaceNewLines, file.read().split("\n\n")))

    for passport in allPassports:
        obj = {}
        fields = passport.split(" ")
        for field in fields:
            key, value = field.split(":")
            obj[key] = value
        passports.append(obj)

passportsValidPhoto = []


def isValid(pp):
    if pp["hcl"][0] == "#" and not re.search("[g-z]", pp["hcl"]):
        if pp["ecl"] in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]:
            passportsValidPhoto.append(pp)
            if len(pp["byr"]) == 4 and 1920 <= int(pp["byr"]) <= 2002:
                if len(pp["iyr"]) == 4 and 2010 <= int(pp["iyr"]) <= 2020:
                    if len(pp["eyr"]) == 4 and 2020 <= int(pp["eyr"]) <= 2030:
                        if (pp["hgt"][-2:] == "cm" and 150 <= int(pp["hgt"][:(len(pp["hgt"]) - 2)]) <= 193) or (pp["hgt"][-2:] == "in" and 59 <= int(pp["hgt"][:(len(pp["hgt"]) - 2)]) <= 76):
                            if len(pp["pid"]) == 9:
                                return True
    return False


validPassports = []
for pp in passports:
    if len(pp) < 8:
        if(len(pp) == 7):
            if not "cid" in pp.keys():
                if isValid(pp):
                    validPassports.append(pp)
    else:
        if isValid(pp):
            validPassports.append(pp)

# Visualization
import pygame
import random
import time
from firstNames import firstNames
from lastNames import lastNames

pygame.init()

WIDTH = 600
HEIGHT = 600

display = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

pygame.display.set_caption("Day 4")

# Fonts
h1 = pygame.font.Font('freesansbold.ttf', 32)
h2 = pygame.font.Font('freesansbold.ttf', 24)
h3 = pygame.font.Font('freesansbold.ttf', 16)


def getEyeColor(pp):
    colors = {
        "amb": "b36800",
        "blu": "2e536f",
        "brn": "634e34",
        "gry": "808080",
        "grn": "1c7847",
        "hzl": "8e7618",
        "oth": random.choice(["f61515", "7f00ff"])
    }

    return list(int(colors[pp["ecl"]][i:i+2], 16) for i in (0, 2, 4))


def displayPerson(pp, changeColor):
    if pp not in passportsValidPhoto:
        corruptedText = h1.render("CORRUPTED PHOTO", True, (0, 0, 0))
        corruptedRect = corruptedText.get_rect(center=(WIDTH/2, 180))
        return display.blit(corruptedText, corruptedRect)

    # Body, head and hair
    personImg = pygame.image.load('person.png')

    personPixels = pygame.PixelArray(personImg)
    if changeColor:
        R = random.randint(0, 200)
        G = random.randint(0, 200)
        B = random.randint(0, 200)
        personPixels.replace(pygame.Color(0, 0, 0), pygame.Color(R, G, B))
    R, G, B = list(int(pp["hcl"].lstrip("#")[i:i+2], 16) for i in (0, 2, 4))
    personPixels.replace(pygame.Color(0, 0, 255), pygame.Color(R, G, B))
    del personPixels

    display.blit(personImg, ((WIDTH - 256) / 2, 60))

    # Eyes
    R, G, B = getEyeColor(pp)

    eye1Img = pygame.image.load('circle.png')

    eye1Pixels = pygame.PixelArray(eye1Img)
    eye1Pixels.replace(pygame.Color(255, 255, 255), pygame.Color(R, G, B))
    del eye1Pixels

    display.blit(eye1Img, ((WIDTH - 16) / 2 - 30, 110))

    eye2Img = pygame.image.load('circle.png')

    eye2Pixels = pygame.PixelArray(eye2Img)
    eye2Pixels.replace(pygame.Color(255, 255, 255), pygame.Color(R, G, B))
    del eye2Pixels

    display.blit(eye2Img, ((WIDTH - 16) / 2 + 30, 110))


def displayDataText(text, Y):
    txt = h3.render(text, True, (0, 0, 0))
    display.blit(txt, (WIDTH / 2 - 80, Y))


def isValidText(valid):
    text = "VALID"
    color = (0, 255, 0)
    if not valid:
        text = "INVALID"
        color = (255, 0, 0)

    txt = h2.render(text, True, color)
    rect = txt.get_rect(center=(WIDTH/2, HEIGHT - 83))
    display.blit(txt, rect)


# Game Loop
running = True
i = 0
validCount = 0
ended = False
finalName = ""
firstTime = True
while running:
    # Event Loop
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    display.fill((255, 255, 255))

    if firstTime:
        pygame.display.update()
        time.sleep(2)
        firstTime = False

    ## Display Passport
    # Name
    if not ended:
        name = random.choice(firstNames) + " " + random.choice(lastNames)
    else:
        name = finalName
    nameText = h1.render(name, True, (0, 0, 0))
    nameRect = nameText.get_rect(center=(WIDTH/2, 20))
    display.blit(nameText, nameRect)

    # Person Data
    if not ended:
        displayPerson(passports[i], True)
    else:
        displayPerson(passports[i], False)

    textY = 350
    displayDataText("Birth Year: " + passports[i].get("byr", "None"), textY)
    textY += 16
    displayDataText("Issue Year: " + passports[i].get("iyr", "None"), textY)
    textY += 16
    displayDataText("Expiration Year: " + passports[i].get("eyr", "None"), textY)
    textY += 16
    displayDataText("Height: " + passports[i].get("hgt", "None"), textY)
    textY += 16
    displayDataText("Hair Color: " + passports[i].get("hcl", "None"), textY)
    textY += 16
    displayDataText("Eye Color: " + passports[i].get("ecl", "None"), textY)
    textY += 16
    displayDataText("Passport ID: " + passports[i].get("pid", "None"), textY)
    textY += 16
    displayDataText("Country ID: " + passports[i].get("cid", "None"), textY)

    # Check if the passport is valid or invalid
    if passports[i] in validPassports:
        isValidText(1)
        if not ended:
            validCount += 1
    else:
        isValidText(0)

    # Valid Passports Text
    validText = h2.render("Valid Passports: " + str(validCount), True, (0, 0, 0))
    validRect = validText.get_rect(center=(WIDTH/2, HEIGHT - 34))
    display.blit(validText, validRect)
    
    # Update
    pygame.display.update()
    clock.tick(60)
    if not ended:
        i += 1

    # Stop if there's no more people
    if i >= len(passports):
        i = len(passports) - 1
        finalName = random.choice(firstNames) + " " + random.choice(lastNames)
        ended = True

    # Sleep before showing the next person
    time.sleep(0.15)

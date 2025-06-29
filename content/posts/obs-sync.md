+++
date = "2025-06-29"
tags = ["Obsidian"]
title = "obs-sync"
type = "post"
+++


> A simple, free, and private way to keep your Obsidian vault in sync between Android and Linux using Syncthing.

---

##  Why I Wanted This

- I dont wanna pay for Obsidian Sync Subscription
    
- My notes is not staying in cloud , Nope.
    
- Or setting up something complex with script
    
- Works offline
    
- Reliable On Android and Linux
---

## Solution : Syncthing — Obsidian Sync 

[Syncthing](https://syncthing.net/) is an open-source tool that syncs folders between devices over local network or internet — privately and securely.

It doesn’t upload your data anywhere. Your files stay on your devices, synced in real time.

---

## Setup Guide

> Works on **any Linux distro** (Windows too) and any Android phone. Tested on Arch Linux + Android 15.

---

### Step 1: Install Syncthing

#### On Android:

- Download **Syncthing-Fork** from F-Droid (Recommended over Play Store version)
    
- Allow necessary permissions for file access
    

#### On Linux:
```
# For Arch-based distros
sudo pacman -S syncthing

# Start Syncthing
systemctl --user enable syncthing.service
systemctl --user start syncthing.service
```
### Step 2: Open the UI

On your Linux system, open a browser and go to:
```
http://localhost:8384
```
This is the Syncthing control panel.

### Step 3: Pair Devices

- Open Syncthing on both Android and Linux
    
- Add device on either side (QR or Device ID)
    
- Accept the pairing request on the other device
	
	NOTE : Both devices needs to be connected on same network in order to show up in the devices list

### Step 4: Share Your Obsidian Vault

#### On Android:

- In Syncthing-Fork, go to **Folders → Add Folder**
    
- Select your Obsidian vault (usually in `/storage/emulated/0/Documents/Obsidian/`)
    
- Share it with your Linux device
    

#### On Linux:

- Accept the shared folder
    
- Choose a destination path (like `~/Documents/Obsidian/`)
    
- Thats it.
    

Now whenever you write or edit notes, they sync automatically in both directions.

---

### Note


    - Android: Enable background sync in Syncthing-Fork settings
    - Linux: Already enabled via `systemctl`   
    - Syncthing handles versioning if you edit the same file from both sides
    - Both devices needs to be connected on same network

+++
date = "2026-08-27"
time = "16:34"
tags = ["vibecoding"]
title = "Vibe coding on the fly"
type = "post"
+++

# Tokenmaxxing at Tea kadai
Tea kadai vibe code setup - A vibecoding setup from your phone when you are outside your wokspace

You left your laptop for the tea break and agents are in mid task and u want to click "Approve changes" or type in your quick prompt so you fully max out your org's claude sub plus you want to continue that in your phone without losing that Flow State and thats where this setup comes in.

We solve this problem using Tmux+Tailscale+Ssh and this setup works for any AI coding harness as we will literally use our laptop in our phone 

Required things to cook this greatness
1. pc/laptop where the AI coding harness is running
2. Mobile with termux installed (pro tip: if you are in mcdonalds they ll always have one windows ordering machine that wont work and shows the entire desktop with touch support so you can leverage that too, your welcome)
3. Tailscale account , click [HERE](https://login.tailscale.com/start) to create one
4. Bit of brain to read this post and put it all together (you can also paste this entire content to ur llm and it might do half of the stuff correctly or will give you entirely ctrl c and ctrl v steps)

In PC
- install [tailscale](https://tailscale.com/docs/install) in your pc according to your operating system and follow their instructions for the setup as i only provided for linux os.
###### Setup Instructions Below is for linux users (ignore this if you dont use linux)
- Enable sshd service so your phone can connect:

  ```bash
  sudo systemctl enable --now sshd
  ```
- To enable tailscale:

  ```bash
  sudo systemctl enable --now tailscaled
  ```
- Run tailscale in terminal and follow the on screen instructions, you need tailscale account btw -> `sudo tailscale up` 
- Run this command to view your pc's address which you ll need to access the pc in your phone so note it down: `tailscale ip -4`

In Phone
- Install [termux](https://f-droid.org/en/packages/com.termux/) and open it (not available for ios users)
-  update the termux (first time users type y and click enter when it asks) `pkg update && pkg upgrade`
- paste in this to install ssh and tmux `pkg install openssh tmux`
- install [tailscale](https://tailscale.com/docs/install)  app from [playstore](https://play.google.com/store/apps/details?id=com.tailscale.ipn&pli=1) or [sideload](https://tailscale.com/download/android) it and then login with your account and follow on screen instructions to get into the app and now your phone is in tailscale network.
- Now go to your termux app and connect to your pc using `ssh username@tailscaleip` put your username of your pc, type this to get it `whoami` and the tailscale ip that you got from the pc command above or else you can just look at the tailscale app or the tailscale website it will show you
- After entering username and tailscale ip address in termux press enter and it will ask that do you want to connect so type *yes* and enter the password of your pc when it asks and boom now you are in, now type exit so we can continue our setup.
- now make a shortcut of the abouve flow so you dont type your tailscale ip again and again, paste this in your termux:

  ```bash
  mkdir -p ~/.ssh
  cat > ~/.ssh/config <<EOF
  Host pc
      HostName 100.x.y.z
      User your-username
  EOF
  chmod 600 ~/.ssh/config
  ```

  edit those lines with your username and ip address
- With that you can just enter `ssh pc` to get into you pc

Usage (That actual Tea kadai vibe coding setup)
- whenever you want to to connect to your live pc's terminal make sure to run the coding harness inside the tmux so you can attach and detach the terminal whenever you need. 
- So open your terminal and use this command create a new tmux session `tmux new -s werk` 
-  after running your harness inside the tmux do your thing and then when you wanna go and get lunch or walk away from your pc just press these key bindings ctrl + b then d which detaches the tmux (dont worry its still running in the background) you can just leave it without detaching it works either way
- now in your mob termux run ssh peasee and boom you are into your pc and to get the terminal session back just type `tmux attach -t werk` and you got your claude code fable instance coding that subway surfer controller using handgesture project

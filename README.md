# What is it?

A small map built using React and Leaflet that displays locations on the Savage Wilds map

# Help me gather data!

I don't know all the spots myself, and I would appreciate filling in the gaps.

I will require at least the following:
* A TeleportPlayer command

You can open an issue here with your teleports or leave me a DM on discord.

If you are familiar with git and GitHub, you may just edit the ``data.json`` in ``public`` yourself and open a pull request.

# Run it
Want to run it locally? It runs without any backend, and is hosted on GH pages. Simply install git and NodeJS (and the bundled npm)
and run these in your command line:

1. ``git clone https://github.com/Mursanian/Savage_Wilds_Interactive_Map.git``
2. ``cd Savage_Wilds_Interactive_Map``
3. ``npm install``
4. ``npm start``

Then open your browser on ``http://localhost:3000``

## Deploying

For now, it's not automated *at all*. I usually do these steps:

1. Locally, delete the ``docs`` directory
2. Run ``npm build``
3. Rename the ``build`` directory to ``docs``
4. Commit and push

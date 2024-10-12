# Product Manager - The Project Guide
---

# Installation
---
## Step 1: Verify the Node.js Version
1. Make sure you are using Node.js version 20.18.0.
2. I recommend using nvm (Node Version Manager) to switch between different Node.js versions.
3. Then verify with **node --version**
---
## Step 2: Install Dependencies
1. Install dependencies for each workspace from the root of the project.
2. Run the following commands: 
- *npm i --workspace api-demo*  
- *npm i --workspace client-demo*

3. Note: Dependencies will be installed. If you need to install specific dependencies, use the same command and specify the workspace where you want them installed.
---
## Step 3: Set Up Docker
1. You will need Docker to run the project.
2. If you are using Windows, you will need to configure WSL 2 and use the Ubuntu terminal for Windows.
###### Links
- Docker Desktop for windows : https://www.docker.com/products/docker-desktop/
- Ubuntu terminal for windows : https://apps.microsoft.com/detail/9pdxgncfsczv?hl=es-es&gl=ES
- wsl 2 config: https://www.adictosaltrabajo.com/2020/06/04/utilizar-docker-con-wsl-2-en-windows-10/#5--instalar-y-configurar-docker

3. For **macOS** or **Linux**, you only need to install **Docker Desktop** or the **Docker Engine**.
---

## Step 4: Run Docker

1. After setting up Docker, run it from the root of the project.
2. Make sure you have the .env file in the api-demo workspace.
3. Run the following command to build and start the services:
- docker compose up --build 

---
# And that's all! c:

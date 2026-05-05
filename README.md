# Digital Clock (using React.js)

> This mini project is a responsive digital clock for PCs, tablets, and mobiles, made while learning [React](https://react.dev/)'s `useState` and `useEffect` hooks.  
> I have another digital clock mini project written in vanilla JS: [digital-clock-js](https://github.com/schak04/digital-clock-js).

---

## CI/CD Pipeline with Jenkins, Docker, and AWS EC2

This project sets up a complete CI/CD pipeline that automates the process of building, containerizing, and deploying a React application.

---

## Objective

The goal of this pipeline is to:
- Build a Docker image from source code
- Push the image to Docker Hub
- Deploy the container to an AWS EC2 instance
- Perform a health check on the deployed service

---

## Tech Stack

- **Main Project:** React.js
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **Deployment:** AWS EC2
- **Web Server:** Nginx

---

## Pipeline Overview

The pipeline is defined in a Jenkinsfile and consists of the following stages:

1. **Clone Repository**
- Fetches latest code from GitHub

2. **Build Docker Image**

```bash
docker build -t schak04/digital-clock .
```

3. **Docker Login & Push**

```bash
docker login
docker push schak04/digital-clock
```

4. **Deploy to EC2**

- Connects to EC2 via SSH
- Pulls latest image
- Stops existing container (if any)
- Runs new container on port 80

```bash
docker pull schak04/digital-clock
docker stop app || true
docker rm app || true
docker run -d -p 80:80 --name app schak04/digital-clock
```

5. **Health Check**

```bash
curl http://3.239.43.103
```

---

## Docker Setup

### Dockerfile

- **Stage 1:** Build React app using Node
- **Stage 2:** Serve static files using Nginx

---

## Jenkins Setup

> This uses Docker socket binding instead of installing Docker inside Jenkins.

Jenkins is run inside a Docker container with access to the host Docker daemon:

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

This allows Jenkins to execute Docker commands during the pipeline.

---

## AWS EC2 Deployment

- EC2 instance configured with Docker
- Port 80 exposed in Security Group
- SSH access enabled for deployment

---

## Deployment URL

`http://3.239.43.103`

---

## Current Status
- Pipeline stages implemented
- Docker build and push configured
- EC2 deployment script written
- Encountered Docker socket permission issues while running Jenkins inside a container (currently debugging)

---

## Notes
- Jenkins uses Docker socket binding (`/var/run/docker.sock`) to interact with the host Docker daemon
- Credentials are managed securely using Jenkins Credentials Manager
- Pipeline is designed to be fully automated on each run

---

## Background

Source: [Cyberpunk Anime City Art Wallpapers - WallpaperCave](https://wallpapercave.com/cyberpunk-anime-city-art-wallpapers#google_vignette)

---

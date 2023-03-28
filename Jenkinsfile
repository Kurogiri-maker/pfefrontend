pipeline {
    agent any 

    // Define environment variables
    environment {
        NODE_VERSION = "18.12.1"
        DOCKER_REGISTRY_USERNAME = 'kurogirixo'
        DOCKER_REGISTRY_PASSWORD = 'dckr_pat_Eg5RZq3aggg-_4n9p84hFwAyNfw'
    }

    // Define stages
    stages {
        stage('Install Dependencies') {
            steps {
                // Use existing Node.js installation
                sh 'node --version'
                
                // Install project dependencies using npm
                sh 'npm install'
            }
    }
}
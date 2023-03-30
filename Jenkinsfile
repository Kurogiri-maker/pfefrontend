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

        stage('Test') {
            steps {
                
                // Run linting using the ESLint plugin
                esLint pattern: 'src/**/*.ts'

            }
        }

        // Build production-ready Angular application
        stage('Build') {
           
            steps {
                // Build Angular application in production mode using npm
                sh 'npm run build -- --configuration=production'
            }

            post {
                always {
                    // Archive build artifacts for later use
                    archiveArtifacts(artifacts: 'dist/**/*')
                }
            }
        }

         stage('Docker Login') {
            steps {
                script {
                    sh "docker login -u ${DOCKER_REGISTRY_USERNAME} -p ${DOCKER_REGISTRY_PASSWORD}"
                }
            }
        }

        stage('Build Docker image') {
            steps {
                sh "docker build -t kurogirixo/Frontcdz:latest ."
            }
        }


        
    }
}
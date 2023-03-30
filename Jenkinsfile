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
                // Run the test script and generate JUnit XML files
                sh 'npm test --reporters=junit --browsers Firefox'

                // Run linting using the ESLint plugin
                esLint pattern: 'src/**/*.ts'
            }

            post {
                always {
                    // Archive test results for later use
                    junit 'test-results/**/*.xml'
                }
            }
        }

        
    }
}
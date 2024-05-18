pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    // Bring down any existing services
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down'
                    // Build and deploy services
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d'
                    echo 'Build Successful'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Ensure Node.js is installed
                    sh 'node -v'
                    sh 'npm -v'
                    
                    // Install dependencies for the test script
                    sh 'npm install'

                    // Run the Selenium test script
                    sh 'node test.js'
                    echo 'build Successful'
                }
            }
        }
    }


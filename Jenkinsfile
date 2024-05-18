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
                    echo 'build Successful'
                }
            }
        }
    }
}

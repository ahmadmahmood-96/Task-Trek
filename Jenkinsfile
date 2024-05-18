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
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            script {
                echo 'Deployment failed! Bringing down services...'
                // Ensure that services are brought down if the deployment fails
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down'
            }
        }
        cleanup {
            script {
                // Optionally bring down services if needed
                // sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down'
                echo 'Cleanup stage (optional).'
            }
        }
    }
}

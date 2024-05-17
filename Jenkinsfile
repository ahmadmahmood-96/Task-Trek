pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Build and Deploy') {
            steps {
                script {
                    // Build and deploy services using docker-compose
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down'
                    sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up --build -d'
                }
            }
        }
    }

    post {
        always {
            script {
                // Ensure that services are brought down after the pipeline run
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down'
            }
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

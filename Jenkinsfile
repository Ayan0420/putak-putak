pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build and Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        sh 'docker build -t backend-app .'
                        sh 'docker stop backend || true'
                        sh 'docker rm backend || true'
                        sh 'docker run -d --name backend -p 3000:3000 backend-app'
                    }
                }
            }
        }
        stage('Build and Deploy Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t frontend-app .'
                        sh 'docker stop frontend || true'
                        sh 'docker rm frontend || true'
                        sh 'docker run -d --name frontend -p 4200:80 frontend-app'
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}

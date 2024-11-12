pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Checkout mit expliziter Angabe des Branches
                git branch: 'main', url: 'https://github.com/dexav/LBM324'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Verwende 'bat' statt 'sh' für Windows
                bat 'mvn clean install' // Passe dies an deinen Projekt-Stack an
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Auch hier 'bat' statt 'sh' für Windows
                bat 'mvn test'
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to Test Environment...'
                // Füge hier Deployment-Befehle hinzu
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}

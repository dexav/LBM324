pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/dexav/LBM324' // Link zu eurem Git-Repository
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Beispiel: Verwende Maven für ein Java-Projekt oder npm für ein Node.js-Projekt
                sh 'mvn clean install' // Anpassen an euren Projekt-Stack
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Beispiel: Unit-Tests ausführen
                sh 'mvn test'
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                echo 'Deploying to Test Environment...'
                // Deployment-Befehle, z.B. Bereitstellung auf einem Testserver oder -container
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

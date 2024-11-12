pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Code aus dem Git-Repository auschecken
                git branch: 'main', url: 'https://github.com/dexav/LBM324' // Euer Repository-URL
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Docker-Image erstellen; passt den Namen des Images und den Pfad an
                sh 'docker build -t gameserver/test-server .'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                // Docker-Login und Push in die Docker-Registry (z.B. Docker Hub)
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push gameserver/test-server'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                // Test-Deployment in Kubernetes
                sh 'kubectl apply -f kubernetes/test-deployment.yaml'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}

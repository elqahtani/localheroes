pipeline {
    agent {label 'master'}
    stages {
        stage('Stage 1') {
            steps {
                sh 'npm install'
                sh 'npm start'
            }
        }
    }
}

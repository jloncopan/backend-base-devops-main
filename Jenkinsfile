pipeline {
    agent any
    stages {
        stage ('Construir y testear') {
            agent {
                docker {
                    image 'node:20.11-alpine3.19'
                    reuseNode true
                }
            }
            stages {
                stage('Instalar dependencias') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Ejecución de test') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Ejecución de build') {
                    steps {
                        sh 'npm run build'
                    }
                }

            }

        }
        stage('deploy') {
            steps {
                docker.withRegistry('http://localhost:8082', 'nexus-key'){
                    sh 'docker build -t backend-base-devops-main:latest .'
                    sh 'docker tag backend-base-devops-main:latest localhost:8082/backend-base-devops-main:latest'               
                    sh 'docker push localhost:8082/backend-base-devops-main:latest'
                }
                
            }
        }
        /*stage ('Ejemplo') {
            steps {
                sh 'echo "hola compíta"'
            }
        }*/

    }


}
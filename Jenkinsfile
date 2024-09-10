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
                sh 'docker build -t backend-base:lastest'
            }
        }
        /*stage ('Ejemplo') {
            steps {
                sh 'echo "hola compíta"'
            }
        }*/

    }


}
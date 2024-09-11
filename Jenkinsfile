pipeline {
    agent any
    environment {
        USERNAME ='cmd'
    }
    options {
        disableConcurrentBuilds()
    }
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
        stage ('Calidad de código') {
            stages {
                stage('SonarQube análisis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli'
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('Puerta de calidad')
                {
                    steps {
                        timeout(time: 1, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }

        stage('Entrega') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key'){
                        sh 'docker build -t backend-base-devops-main:latest .'
                        sh 'docker tag backend-base-devops-main:latest localhost:8082/backend-base-devops-main:latest'  
                        sh "docker tag backend-base-devops-main:latest localhost:8082/backend-base-devops-main:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"                
                        sh 'docker push localhost:8082/backend-base-devops-main:latest'
                        sh "docker push localhost:8082/backend-base-devops-main:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    }

                }
            }
        }
        stage('Despliegue') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key'){
                        sh 'docker compose pull'
                        sh 'docker compose up --force-recreate --build -d'                        
                    }

                }
            }
        }

   

    }


}